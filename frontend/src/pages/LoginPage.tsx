import { useForm } from "react-hook-form";
import { login } from "../features/user/userSlice";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import Swal from "sweetalert2"; // Impor SweetAlert2
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
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.user);
  const { token } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/"); // Arahkan pengguna yang sudah login
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
      await dispatch(login(data)).unwrap(); // unwrap untuk mendapatkan hasil dari login
    } catch (err: any) {
      // Menangani error langsung dari backend
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: err.response?.data?.message || "Terjadi kesalahan. Silakan coba lagi.", // Improved error handling
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
        Login to Circle
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
            placeholder="Email"
            id="email"
            {...register("email")}
          />
          {errors.email && <Text color="red">{errors.email.message}</Text>}

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

          <Box display="flex" justifyContent="end">
            <Link href="/forgot" color="white" fontWeight={500}>
              Forgot password
            </Link>
          </Box>

          <Button
            backgroundColor="primary.active"
            fontSize={20}
            fontWeight={700}
            height="44px"
            borderRadius={50}
            _hover={{ backgroundColor: "primary.disable" }}
            color={"white"}
            type="submit">
            {loading ? <Spinner color="white" /> : "Login"}
          </Button>

          <Box display="flex" gap={1} fontSize="14px">
            <Text fontWeight={500} color="white">
              Don't have an account yet?
            </Text>
            <Link href="/register" fontWeight={700} color="primary.active">
              Create account
            </Link>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default LoginPage;
