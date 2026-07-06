import { FormField, type FormFieldConfig } from "@/components/FormField";
import { useAuth } from "@/context/AuthContext";
import { Button, Center, Paper, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
const formFields: FormFieldConfig[] = [
  {
    id: "username",
    label: "Username",
    type: "text",
  },
  {
    id: "password",
    label: "Password",
    type: "text",
  },
];
export default function Login() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { username: "", password: "" },
  });
  const navigate = useNavigate();
  const { setIsLogin } = useAuth();
  return (
    <Center h="100vh">
      <Paper bg="dark" p="xl" w={300}>
        <form
          onSubmit={form.onSubmit((values) => {
            if (values.username === "admin" && values.password === "admin") {
              setIsLogin(true);
              navigate("/home/");
            } else {
              notifications.show({
                title: "Login Failed",
                message: "Invalid username or password",
                color: "red",
              });
            }
          })}
        >
          <Stack>
            {formFields.map((formField) => (
              <FormField key={formField.id} form={form} formField={formField} />
            ))}
            <div>
              <Button type="submit">Login</Button>
            </div>
          </Stack>
        </form>
      </Paper>
    </Center>
  );
}
