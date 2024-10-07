import { useForm } from "react-hook-form";
import { registerUser } from "../features/user/userSlice";
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

// Schema untuk validasi data registrasi
const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
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
      const resultAction = await dispatch(registerUser(data)).unwrap();
      const fullName = resultAction.user.name;
      // Menangani respons sukses
      Swal.fire({
        icon: "success",
        title: `Wellcome to Circle ${fullName}`,
        text: resultAction.message, // Pesan dari backend
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
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
            placeholder="Name"
            id="name"
            {...register("name")}
          />
          {errors.name && <Text color="red">{errors.name.message}</Text>}

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
