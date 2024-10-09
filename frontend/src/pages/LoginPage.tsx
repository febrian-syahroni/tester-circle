import { useForm } from "react-hook-form";
import { login } from "../features/user/userSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const loginSchema = z.object({
  username: z.string().min(1, "Username atau email diperlukan"),
  password: z.string().min(6, "Password harus minimal 6 karakter"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { loading, token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await dispatch(login(data)).unwrap();
      // Simpan token ke localStorage atau state global
      localStorage.setItem('token', response);
      navigate("/");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: err.message || "Username atau password salah. Silakan coba lagi.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Box className="container" gap="20px" width={412}>
      <Box display="flex" width="100%">
        <Image src={logo} />
      </Box>
      <Text fontSize={28} width="100%" fontWeight={700} color="white">
        Masuk ke Circle
      </Text>
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          color="white"
          display="flex"
          flexDirection="column"
          gap="12px">
          <Input
            height="48px"
            borderColor="secondary"
            placeholder="Username"
            id="username"
            {...register("username")}
          />
          {errors.username && (
            <Text color="red">{errors.username.message}</Text>
          )}

          <Input
            height="48px"
            borderColor="secondary"
            id="password"
            {...register("password")}
            placeholder="Password"
            type="password"
          />
          {errors.password && (
            <Text color="red">{errors.password.message}</Text>
          )}

          <Button
            backgroundColor="primary.active"
            fontSize={20}
            fontWeight={700}
            height="44px"
            borderRadius={50}
            _hover={{ backgroundColor: "primary.disable" }}
            color={"white"}
            type="submit">
            {loading ? <Spinner color="white" /> : "Masuk"}
          </Button>

          <Box display="flex" gap={1} fontSize="14px">
            <Text fontWeight={500} color="white">
              Belum punya akun?
            </Text>
            <Link href="/register" fontWeight={700} color="primary.active">
              Buat akun
            </Link>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default LoginPage;