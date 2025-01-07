# resource "aws_security_group" "taskflow" {
#   name        = "taskflow"
#   description = "Allow TLS inbound traffic and all outbound traffic for taskflow"

#   tags = {
#     Name = "allow_tls_taskflow"
#   }
# }

# resource "aws_vpc_security_group_ingress_rule" "allow_ssh_my_ip" {
#   security_group_id = aws_security_group.taskflow.id
#   cidr_ipv4         = "42.119.222.188/32"
#   from_port         = 22
#   ip_protocol       = "tcp"
#   to_port           = 22
# }

# resource "aws_vpc_security_group_ingress_rule" "allow_http" {
#   security_group_id = aws_security_group.taskflow.id
#   cidr_ipv4         = "0.0.0.0/0"
#   from_port         = 80
#   ip_protocol       = "tcp"
#   to_port           = 80
# }

# resource "aws_vpc_security_group_ingress_rule" "allow_tls_ipv6" {
#   security_group_id = aws_security_group.taskflow.id
#   cidr_ipv6         = "::/0"
#   from_port         = 443
#   ip_protocol       = "tcp"
#   to_port           = 443
# }

# resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_ipv4" {
#   security_group_id = aws_security_group.taskflow.id
#   cidr_ipv4         = "0.0.0.0/0"
#   ip_protocol       = "-1" # semantically equivalent to all ports
# }

# resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_ipv6" {
#   security_group_id = aws_security_group.taskflow.id
#   cidr_ipv6         = "::/0"
#   ip_protocol       = "-1" # semantically equivalent to all ports
# }

#Backend security group
# resource "aws_security_group" "sg-backend" {
#   name = "taskflow-backend"
#   tags = {
#     Name ="Security group for taskflow backend"
#   }
# }

# resource "aws_vpc_security_group_ingress_rule" "allow_from_frontend" {
#   security_group_id = aws_security_group.sg-backend.id
#   ip_protocol = "tcp"
#   referenced_security_group_id = aws_security_group.sg-frontend.id
#   from_port = 8080
#   to_port = 8080
# }

# resource "aws_vpc_security_group_ingress_rule" "allow_ssh_backend_all_ip" {
#   security_group_id = aws_security_group.sg-backend.id
#   cidr_ipv4         = "0.0.0.0/0"
#   from_port         = 22
#   ip_protocol       = "tcp"
#   to_port           = 22
# }

# resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_ipv4_backend" {
#   security_group_id = aws_security_group.sg-backend.id
#   cidr_ipv4         = "0.0.0.0/0"
#   ip_protocol       = "-1" # semantically equivalent to all ports
# }

# resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_ipv6_backend" {
#   security_group_id = aws_security_group.sg-backend.id
#   cidr_ipv6         = "::/0"
#   ip_protocol       = "-1" # semantically equivalent to all ports
# }

#Frontend security group
resource "aws_security_group" "sg-frontend" {
  name = "taskflow-frontend"
}

resource "aws_vpc_security_group_ingress_rule" "allow_http_frontend" {
  security_group_id = aws_security_group.sg-frontend.id
  cidr_ipv4         = "0.0.0.0/0"
  
  ip_protocol       = "-1"
 
}

resource "aws_vpc_security_group_ingress_rule" "allow_tls_ipv6_frontend" {
  security_group_id = aws_security_group.sg-frontend.id
  cidr_ipv6         = "::/0"
 
  ip_protocol       = "-1"
  
}

# resource "aws_vpc_security_group_ingress_rule" "allow_ssh_frontend_all_ip" {
#   security_group_id = aws_security_group.sg-frontend.id
#   cidr_ipv4         = "0.0.0.0/0"
#   from_port         = 22
#   ip_protocol       = "tcp"
#   to_port           = 22
# }

resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_ipv4_frontend" {
  security_group_id = aws_security_group.sg-frontend.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # semantically equivalent to all ports
}

resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_ipv6_frontend" {
  security_group_id = aws_security_group.sg-frontend.id
  cidr_ipv6         = "::/0"
  ip_protocol       = "-1" # semantically equivalent to all ports
}

#Security group for database
# resource "aws_security_group" "sg-db" {
#   name = "taskflow-db"
# }

# resource "aws_vpc_security_group_ingress_rule" "allow_from_backend" {
#   security_group_id = aws_security_group.sg-db.id
#   referenced_security_group_id = aws_security_group.sg-backend.id
#   ip_protocol = "tcp"
#   from_port = 3306
#   to_port = 3306
# }

