
#Minishop-Infra

O propósito desse projeto é montar uma infraestrutura que comporte duas aplicações em um cluster ec2 utilizando os limites do free tier. **Atenção**: Alguns recursos importantes para a segurança da aplicação não foram aplicados para que não implicassem em custos operacionais, utilize esse código apenas para fins de entendimento sobre infraestrutura como código(IaC-Infrastructure as Code).

  

##Pré-requisitos

-Conta na AWS

-Caso tenha alguma dúvida, consulte a documentação do Terraform: https://www.terraform.io/

  

##Recursos criados

-Cluster ecs com instâncias ec2

-Dois Simples Storage Services (s3)

-Virtual Private Cloud (VPC)

-Um Load Balancer para cada serviço

-Um Target Group para cada serviço

-Listener do Load Balancer já direcionados aos serviços individualmente

-Security Group para o DB com acesso público

-Security Group para o cluster com acesso apenas para os load balancers

-Security Group para os Load Balancers com acesso público

-Roles necessárias para requisições na api AWS

-Subnets públicas em todas as zonas de disponibilidade da região SA-EAST-1

-Route table com internet gateway anexado

-Grupo de escalonamento automático para o cluster

-Um grupo no CloudWatch para cada serviço

-Dois serviços e suas respectivas task definitions

##Hora da prática:
-terraform init

-terraform validate

-terraform plan -out=tfplan

-terraform apply tfplan

-rm tfplan

Para utilizar a infraestrutura disponibilizada como código neste repositório, acesse o arquivo variables.tf e insira informações que estejam comentadas como importantes, insira o valor desejado em um campo "default" da variável, deixei alguns exemplos no arquivo.
Antes de inicializar o projeto com "terraform init", é importante gerar credenciais válidas para o provider, declarado no arquivo providers.tf, você pode fazer isso exportando como variável de ambiente no formato export TV_VAR_suavariavel=seuvalor ou adicionando um arquivo .tfvars ao projeto, segue referência para possíveis dúvidas: 

-https://www.terraform.io/language/values/variables

-https://www.terraform.io/language/providers/configuration

Como última configuração necessária, você deve criar um bucket no s3 antes de executar o código, haja visto que a inicialização do backend do terraform depende inteiramente de um object storage. Altere o nome do bucket no arquivo providers.tf

-https://www.terraform.io/language/settings/backends/configuration

-https://www.terraform.io/language/settings/backends/s3

Compare o nome dos serviços Cloud
-https://comparecloud.in/
