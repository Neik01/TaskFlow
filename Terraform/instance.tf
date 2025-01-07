# resource "aws_instance" "amiID" {
#   ami                    = data.aws_ami.amiID.id
#   instance_type          = "t2.micro"
#   key_name               = "taskflow-keypair"
#   vpc_security_group_ids = [aws_security_group.taskflow.id]
#   availability_zone      = "ap-southeast-1a"
#   tags = {
#     Name = "TaskFlow"
#   }
# }

# resource "aws_instance" "taskflow-backend" {
#   ami                    = data.aws_ami.amiID.id
#   instance_type          = "t2.micro"
#   key_name               = "taskflow-keypair"
#   vpc_security_group_ids = [aws_security_group.sg-backend.id]
#   availability_zone      = "ap-southeast-1a"
#   tags = {
#     Name = "TaskFlow-backend"
#   }


#   provisioner "file" {
#     source      = "User_data/backend.sh"
#     destination = "/tmp/web.sh"
#   }
#   # user_data = "${file("backend.sh")}"
#    connection {
#     type        = "ssh"
#     user        = "ubuntu"
#     private_key = file("taskflow-key")
#     host        = self.public_ip
#   }

#   provisioner "remote-exec" {

#     inline = [
#       "chmod +x /tmp/web.sh",
#       "sudo /tmp/web.sh"
#     ]
#   }
# }

resource "aws_instance" "taskflow-frontend" {
 ami                    = data.aws_ami.amiID.id
  instance_type          = "t3.small"
  key_name               = "taskflow-keypair"
  vpc_security_group_ids = [aws_security_group.sg-frontend.id]
  availability_zone      = "ap-southeast-1a"
  tags = {
    Name = "TaskFlow-frontend"
  }

  provisioner "file" {
    source      = "User_data/frontend.sh"
    destination = "/tmp/web.sh"
  }
  # user_data = "${file("frontend.sh")}"
  connection {
    type        = "ssh"
    user        = "ubuntu"
    private_key = file("taskflow-key")
    host        = self.public_ip
  }

  provisioner "remote-exec" {

    inline = [
      "chmod +x /tmp/web.sh",
      "sudo /tmp/web.sh"
    ]
  }
}

# resource "aws_db_instance" "default" {
#   allocated_storage    = 10
#   db_name              = "TaskFlow"
#   engine               = "mysql"
#   engine_version       = "8.0"
#   instance_class       = "db.t3.micro"
#   username             = "root"
#   password             = "011020Kk"
#   parameter_group_name = "default.mysql8.0"
#   skip_final_snapshot  = true
#   availability_zone = "ap-southeast-1a"
#   vpc_security_group_ids = [ aws_security_group.sg-db.id ]
# }

# output "pub_backend_id" {
#   value = aws_instance.taskflow-backend.public_ip
# }

# output "pub_frontend_id" {
#   value = aws_instance.taskflow-frontend.public_ip
# }