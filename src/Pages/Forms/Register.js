import React, {  useState } from 'react'
import { Grid ,Box} from '@mui/material'
import './Forms.css'
import TextField  from '@mui/material/TextField';
import Button from '@mui/material/Button';
import img from '../../register.png'
import { Link } from 'react-router-dom';
import { Formik } from 'formik'
import * as yup from "yup"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { motion } from "framer-motion";



const Register = () => {
    const [passwordControl,setpasswordControl]=useState(true)

    const handleInputChange = (event) => {
        const value = event.target.value.replace(/\D/g, ''); // Sadece sayısal karakterleri alır
        event.target.value = value;
      };

      const regexTurkishBigLetters = /[A-ZÇĞİÖŞÜ]/;
      const regexBig = new RegExp(regexTurkishBigLetters);
      const regexAllSpecial = /[!@#$%^&*()+\-=_\[\]{}|\\;:'",.<>/?]+/;
      const regexSpecial = new RegExp(regexAllSpecial);

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


    const userRegister=async(values)=>{

          console.log(values)
        const data={
            name:"ali",
            surname:values.namesurname,
            telephone:values.phonenumber,
            email:values.email,
            password:values.password
        }
         try{
            const response = await fetch("http://localhost:5000/users/register",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
                 }) 
                 const result = await response.json(); // database den gelen mesaj 
                 
                console.log(result)

        }catch(e){
            console.log(e)
        }  
    }


    const Controlpassword=(values)=>{
        console.log(values)
        if((regexBig.test(values.password) || regexBig.test(values.trypassword))&& 
        (regexSpecial.test(values.password)|| regexSpecial.test(values.trypassword))&&
        (values.password.length>=8 ||values.trypassword.length>=8))
        {
            setpasswordControl(true)
            values.passwordControl=true
        }
        else{
            setpasswordControl(false)
            values.passwordControl=false
        }
    }

  return (
    <div>
        <Grid container >
            <Grid display={'flex'} justifyContent={"center"} alignItems={"center"}  item md={6} xs={12}>
                <Grid item  md={8} sm={9} xs={10} >
                    <div class='containerLeft'>
                        <motion.div className='leftForm_register'
                            initial={{opacity:0,y:50}}
                            animate={{opacity:1, y:0}}
                            transition={{duration:1.5}}
                        >
                            <div className='loginGiris'>Kayıt Ol</div>
                            <Formik

                            initialValues={{
                                namesurname:"",
                                email:"",
                                phonenumber:"",
                                password:"",
                                trypassword:"",
                                passwordControl:""
                            }}
                            validationSchema={
                                yup.object({
                                    namesurname:yup.string().required("İsim alanı boş bırakılamaz"),
                                    email:yup.string().email("Lütfen Geçerli Bir Mail Giriniz( @ )").required("Email Boş Bırakilamaz") ,
                                    phonenumber:yup.string().min(11,"Eksik numara girdiniz").required("Telefon numarası zorunludur"),
                                    password:yup.string().min(8,"Şifre En Az 8 Karakterli Olmalıdır").required("Şifre Boş Bırakılamaz"),
                                    trypassword:yup.string().min(8,"Şifre En Az 8 Karakterli Olmalıdır").oneOf([yup.ref('password')], 'Şifreler Uyuşmuyor').required("Şifre Tekrarı Boş Bırakılamaz"),
                                    passwordControl:yup.boolean().required()
                                })
                            }
                            onSubmit={(values,{resetForm})=>{ // form submit olduktan sonra yapılacaklar
                                if(values.trypassword === values.password) // şifreler aynı ise form temizlenir
                                {
                                    if(values.passwordControl===true){
                                        userRegister(values) //bilgileri database'e göndermek için
                                        console.log(values)
                                    setTimeout(()=>{ // 2 sn sonra formu resetledik
                                        resetForm();
                                    },2000)
                                    }
                                    else{
                                        console.log("kurallar uyun")
                                        setpasswordControl(false)
                                        console.log(passwordControl)
                                    }
                                }
                                }}
                            >
                               { 
                                    ({values,errors,handleSubmit,handleChange,touched,handleBlur})=>(
                                        <form onSubmit={handleSubmit} style={{width:'80%',textAlign:'center'}} method='POST'>
                                            <TextField on
                                            label="İsim Soyisim"
                                            id="namesurname"
                                            onChange={handleChange}
                                            value={values.namesurname}
                                            onBlur={handleBlur}
                                            error={errors.namesurname && touched.namesurname}
                                            helperText={errors.namesurname && touched.namesurname ? errors.namesurname:null}
                                            sx={{...inputstyles, ...erorStyles}}
                                            />
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
                                            id="phonenumber"
                                            label="Telefon Numarası"
                                            inputProps={{
                                                inputMode: 'numeric',
                                                pattern: '[0-9]*',
                                                defaultValue: '05',
                                                maxLength: 11,
                                                onInput: handleInputChange
                                            }}
                                            onChange={handleChange}
                                            value={values.phonenumber}
                                            onBlur={handleBlur}
                                            error={errors.phonenumber && touched.phonenumber}
                                            helperText={errors.phonenumber && touched.phonenumber ? errors.phonenumber:null}
                                            sx={{...inputstyles, ...erorStyles}}
                                            />
                                            <TextField
                                            onKeyUp={()=>Controlpassword(values)}
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
                                            <TextField
                                            id="trypassword"
                                            label="Şifre Tekrarı"
                                            type="password"
                                            onChange={handleChange}
                                            value={values.trypassword}
                                            onBlur={handleBlur}
                                            error={errors.trypassword && touched.trypassword}
                                            helperText={errors.trypassword && touched.trypassword ? errors.trypassword:null}
                                            sx={{...inputstyles, ...erorStyles}}
                                            />
                                            <Box sx={passwordControl ? {opacity:"0.5",marginTop:"20px",display:'none'}:{opacity:"0.5",marginTop:"20px"}}>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                            {values.password.length >= 8 || values.trypassword.length >= 8? (
                                                <CheckCircleOutlineIcon sx={{ color: "green", mr: 1 }} />
                                            ) : (
                                                <HighlightOffIcon sx={{ color: "red", mr: 1 }} />
                                            )}
                                            <span>Min 8 Karakter</span>
                                            </Box>

                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                {regexSpecial.test(values.password) || regexSpecial.test(values.trypassword) ? (
                                                    <CheckCircleOutlineIcon sx={{ color: "green", mr: 1 }} />
                                                ) : (
                                                    <HighlightOffIcon sx={{ color: "red", mr: 1 }} />
                                                )}
                                                <span>En az 1 özel karakter</span>
                                            </Box>

                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                {regexBig.test(values.password) || regexBig.test(values.trypassword) ? (
                                                    <CheckCircleOutlineIcon sx={{ color: "green", mr: 1 }} />
                                                ) : (
                                                    <HighlightOffIcon sx={{ color: "red", mr: 1 }} />
                                                )}
                                                <span>En az 1 adet büyük harf</span>
                                            </Box>
                                            </Box>
                                                    {
                                                        (regexBig.test(values.password) || regexBig.test(values.trypassword)) &&
                                                        (regexSpecial.test(values.password) ||regexSpecial.test(values.trypassword)) &&
                                                       ( values.password.length >= 8 || values.trypassword.length >= 8)  &&
                                                       !errors.email && !errors.namesurname && !errors.password && !errors.phonenumber && !errors.trypassword
                                                        ? 
                                                        <Button className='btn' type='submit' variant="contained" >Kayıt Ol</Button>
                                                        :
                                                        <Button className='btn notActive' variant="contained" onClick={()=>{return false}}>Kayıt Ol</Button>
                                                    }
                                        </form>
                                    )
                                }
                            </Formik>
                            <div className='loginKaydol'>
                                    Hesabın varmı
                                    <Link style={{textDecoration:"none",color:'tomato',marginLeft:1}} to={"/login"}> <div className='kaydol'>Giriş yap</div>
                                </Link>
                            </div>
                        </motion.div>
                    </div> 
                </Grid>
            </Grid>
            <Grid  item md={6} sm={0}  display={"flex"} alignItems={"center"}>
            <motion.div class='containerRight'
                initial={{
                    opacity: 0,
                    y:-100
                }}
                animate={{
                    opacity: 1,
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

export default Register
