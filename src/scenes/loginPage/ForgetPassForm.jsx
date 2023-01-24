import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";





const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
 
});



const ForgetPassForm = () => {
  const [forPassword, setForPassword] = useState({ email:""});
  const { palette } = useTheme();
  const theme = useTheme();
  const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  
 
  

  

  const handlePasswordSubmit = async (values) => {
    
    const response = await fetch("http://localhost:3002/forgotpass",{
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(values),
     });
     const pass = await response.json();
      setForPassword(pass);
    navigate("/home");
  };

  return (
<Box>
<Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
         FriendLink
        </Typography>
      </Box>
      <Box
      width={isNonMobileScreens ? "50%" : "93%"}
      p="2rem"
      m="2rem auto"
      borderRadius="1.5rem"
      backgroundColor={theme.palette.background.alt} 
      >
         <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to FriendLink, the Social Media for Friends!
        </Typography>

<Formik
      onSubmit={handlePasswordSubmit}
      initialValues={ forPassword }
      validationSchema={ loginSchema }
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        handleChange,
      }) => (
         <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
           
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.forPassword}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
             send
            </Button>

            <Typography
            onClick= {() =>{
            navigate("/home");
            }}
             sx={{
              textDecoration: "underline",
              color: palette.primary.main,
              "&:hover": {
                cursor: "pointer",
                color: palette.primary.light,
              },
            }}
            >Login?</Typography>
            
          </Box>
         </form>
      )}
    </Formik>
    </Box>
</Box>

  );
};

export default ForgetPassForm;