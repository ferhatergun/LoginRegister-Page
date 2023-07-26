import React from 'react'
import { Grid } from '@mui/material'
import './Forms.css'
import TextField  from '@mui/material/TextField';
import Button from '@mui/material/Button';
import img from '../../login.jpg'
import { Link } from 'react-router-dom';
import { Formik } from 'formik'
import * as yup from "yup"
import { motion } from "framer-motion";


const Login = () => {

    const inputstyles = {
        "& .MuiInputLabel-root.Mui-focused ": {
          // placeholders yukarı gidinceki rengi
          color: "black",
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#a3519f !important", // inputa basınca kenarlık
            borderWidth: "2px",
        },
        width: "100%",
        marginTop: "20px",
      };
      const erorStyles={
        "& .MuiFormHelperText-root.Mui-error":{
          position:'absolute',
          marginTop:'55px',
          marginLeft:0
        }
    }

  return (
    <div>
        <Grid container>
            <Grid display={'flex'} justifyContent={"center"} alignItems={"center"}  item md={6} xs={12}>
                <Grid item  md={8} sm={9} xs={10} >
                    <div class='containerLeft'>
                        <motion.div
                            className="leftForm"
                            initial={{ opacity: 0, y:50 }}
                            animate={{ opacity: 1, y:0 }}
                            transition={{duration: 1.5}}>
                            <div className='loginGiris'>Giriş Yap</div>
                            <Formik
                            initialValues={{
                                email:"",
                                password:""
                            }}
                            validationSchema={
                                yup.object({
                                    email:yup.string().email("Lütfen Geçerli Bir Mail Giriniz( @ )").required("Email Boş Bırakilamaz"),
                                    password:yup.string().min(6,"Şifre En Az 6 Karakterli Olmalıdır").required("Şifre Boş Bırakılamaz"),
                                })
                            }
                            onSubmit={(values,{resetForm})=>{ // form submit olduktan sonra yapılacaklar

                                    console.log(values)
                                    setTimeout(()=>{ // 2 sn sonra formu resetledik
                                        resetForm();
                                    },2000)
                                }}
                            >
                                {
                                    ({values,errors,handleSubmit,handleChange,dirty,isSubmitting,touched,handleBlur})=>(
                                        <form onSubmit={handleSubmit} style={{width:'80%',textAlign:'center'}}>
                                            <TextField 
                                            id="email" 
                                            label="Email" 
                                            onChange={handleChange}
                                            value={values.email}
                                            onBlur={handleBlur}
                                            error={errors.email && touched.email}
                                            helperText={errors.email && touched.email ? errors.email:null}
                                            sx={{...inputstyles, ...erorStyles}}
                                            />
                                            <TextField
                                            id="password"
                                            label="Şifre"
                                            type="password"
                                            onChange={handleChange}
                                            value={values.password}
                                            onBlur={handleBlur}
                                            error={errors.password && touched.password}
                                            helperText={errors.password && touched.password ? errors.password:null}
                                            sx={{...inputstyles, ...erorStyles}}
                                            />
                                             <div className='sifreUnuttum'>
                                            <Link className='unuttum' to="/forgotpass" >Şifremi Unuttum</Link>
                                            </div>
                                            <Button className='btn' variant="contained"  type='submit'>Giriş Yap</Button>
                                        </form>
                                    )
                                }


                            </Formik>
                        
                        
                           
                            <div className='loginKaydol'>
                               Hesabın Yokmu ? <Link style={{textDecoration:"none",marginLeft:1}} to="/register"><div className='kaydol' > Hemen Kaydol</div> </Link>

                            </div>
                        </motion.div>
                    </div> 
                </Grid>
            </Grid>


            <Grid  item md={6} sm={0}  display={"flex"} alignItems={"center"}>
            <motion.div class='containerRight'
                initial={{
                    opacity: 0,
                    // scale:.8,
                    y:-100
                }}
                animate={{
                    opacity: 1,
                    // scale:1,
                    y:0
                }}
                transition={{
                    duration: 1.5,
                }}
                >
                <img class='fotoRight' src={img} alt="" ></img>
            </motion.div>
            </Grid>
        </Grid>
      
    </div>
  )
}

export default Login
