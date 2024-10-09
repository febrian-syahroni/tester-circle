import { useForm } from "react-hook-form";
import { register } from "../features/user/userSlice";
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

// Schema untuk validasi data registrasi sesuai dengan dokumentasi
const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  fullname: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Tipe untuk data form registrasi
type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await dispatch(register(data) as any).unwrap();
      // Menggunakan respons sukses untuk menangani nama lengkap pengguna
      Swal.fire({
        icon: "success",
        title: `Welcome to Circle ${data.fullname}`,
        text: "User created successfully", // Pesan dari dokumentasi
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/"); // Redirect ke halaman home
      });
    } catch (err: any) {
      // Menangani error jika ada
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error || "Terjadi kesalahan. Silakan coba lagi.", // Menampilkan error dari backend
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
        Create Account
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
            placeholder="Full Name"
            id="fullname"
            {...register("fullname")}
          />
          {errors.fullname && (
            <Text color="red">{errors.fullname.message}</Text>
          )}

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

          <Button
            backgroundColor="primary.active"
            fontSize={20}
            fontWeight={700}
            height="44px"
            borderRadius={50}
            _hover={{ backgroundColor: "primary.disable" }}
            color={"white"}
            type="submit">
            {loading ? <Spinner color="white" /> : "Register"}
          </Button>

          <Box display="flex" gap={1} fontSize="14px">
            <Text fontWeight={500} color="white">
              Already have an account?
            </Text>
            <Link href="/login" fontWeight={700} color="primary.active">
              Login here
            </Link>
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default RegisterPage;
