variable "aws_region" {
  type    = string
  default = "us-east-1"
}

data "amazon-ami" "amazon-linux-2_ami" {
    filters = {
        virtualization-type = "hvm"
        name = "amzn2-ami-kernel-5.10-hvm-2.0.20230207.0-x86_64-gp2"
        # owners = ["137112412989"]
        # owner-id = "137112412989"
    }
    owners = ["amazon"]
    most_recent = true
    profile  = "dev"
}


variable "ssh_username" {
  type    = string
  default = "ec2-user"
  # default = "ubuntu"
}


# https://www.packer.io/plugins/builders/amazon/ebs
source "amazon-ebs" "my-ami" {
  region     = "${var.aws_region}"
  ami_name        = "csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  profile  = "dev"
  ami_description = "AMI for CSYE 6225"
  ami_regions = [
    "us-east-1",
    "us-east-2",
  ]
  ami_users = ["300978227218"] ## DEV & DEMO

  aws_polling {
    delay_seconds = 30
    max_attempts  = 50
  }


  instance_type = "t2.micro"
  # source_ami    = "${var.source_ami}"
  source_ami    = "${data.amazon-ami.amazon-linux-2_ami.id}"
  ssh_username  = "${var.ssh_username}"
  vpc_filter {
    filters = {
      "isDefault": "true"
    }
  }

    launch_block_device_mappings {
      delete_on_termination = true
      device_name           = "/dev/xvdg"
      volume_size           = 8
      volume_type           = "gp2"
      # encrypted            = true 
    }
}

build {
  sources = ["source.amazon-ebs.my-ami"]

  provisioner "shell" {
    inline = ["mkdir -p /tmp/apps/"]
  }
  
  provisioner "file" {
    source = "webapp.zip"
    destination = "/tmp/apps/webapp.zip"
  }

  provisioner "file" {
    source = "app.service"
    destination = "/tmp/app.service"
  }

  provisioner "shell" {
      script = "setup.sh"
      environment_vars =[
        "REGION=${var.aws_region}"
      ] 
  }
  
}
