import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import {
  Container,
  Title,
  Column,
  TitleLogin,
  SubtitleLogin,
  InfoText,
  LoginText,
  TextBtn,
  Row,
  Wrapper,
} from "./styles";

const Sign = () => {
  //console.log('entrou no sign');
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const onSubmit = async (formData) => {
    try {
      const { data } = await api.get(
        `/users?email=${formData.email}&senha=${formData.senha}`
      );

      if (data.length && data[0].id) {
        navigate("/feed");
        return;
      }

      alert("Usuário ou senha inválido");
    } catch (e) {
      //TODO: HOUVE UM ERRO
    }
  };

  console.log("errors", errors);

  return (
    <>
      <Header />
      <Container>
        <Column>
          <Title>
            A plataforma para você aprender com experts, dominar as principais
            tecnologias e entrar mais rápido nas empresas mais desejadas.
          </Title>
        </Column>
        <Column>
          <Wrapper>
            <TitleLogin>Comece agora grátis</TitleLogin>
            <SubtitleLogin>Faça seu Cadastro e make the change._</SubtitleLogin>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder="Nome completo"
                leftIcon={<MdPerson size={20} color="#8647AD" />}
                name="person"
                control={control}
              />
              {errors.person && <span>Nome é obrigatório</span>}
              <Input
                placeholder="E-mail"
                leftIcon={<MdEmail size={20} color="#8647AD" />}
                name="email"
                control={control}
              />
              {errors.email && <span>E-mail é obrigatório</span>}
              <Input
                type="password"
                placeholder="Password"
                leftIcon={<MdLock size={20} color="#8647AD" />}
                name="senha"
                control={control}
              />
              {errors.senha && <span>Senha é obrigatório</span>}
              <Button
                title="Criar minha conta"
                variant="secondary"
                type="submit"
              />
            </form>
            <Row>
              <InfoText>
                Ao clicar em "criar minha conta grátis", declaro que aceito as
                Políticas de Privacidade e os Termos de Uso da DIO.
              </InfoText>
            </Row>
            <Row>
            <Link to="/login">  <LoginText>Já tenho conta.</LoginText> </Link>
              <Link to="/login">  <TextBtn>Fazer login </TextBtn> </Link>
            </Row>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
};

export { Sign };
