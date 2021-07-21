import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link,Redirect } from "react-router-dom";
import {read,update,updateUser} from "./apiUser"

const Profile = ({match}) => {
  const [values, setValues] = useState({
    name:"",
    email:"",
    password:"",
    error:false,
    success:false
  })
  const {name,email,password,error,success} = values
  
  const {token} = isAuthenticated()
  const init = (userId)=>{
    read(userId,token)
    .then(data=>{
      if(data.error){
        setValues({...values, error:true})
      }else{
        setValues({...values,name:data.name,email:data.email})
        console.log(data);
      }
    })
  }


 useEffect(() => {
   init(match.params.userId)
 }, [])

 const handleChange = name => e => {
  setValues({ ...values, error: false, [name]: e.target.value });
};
const clickSubmit = e => {
  e.preventDefault();
  update(match.params.userId, token, { name, email, password }).then(data => {
      if (data.error) {
          alert(data.error);
      } else {
          updateUser(data, () => {
              setValues({
                  ...values,
                  name: data.name,
                  email: data.email,
                  success: true
              });
          });
      }
  });
};
const redirectUser = success => {
  if (success) {
      return <Redirect to="/cart" />;
  }
};

 const profileUpdate = (name, email, password) => (
  <form>
      <div className="form-group">
          <label className="text-muted">İsim</label>
          <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
      </div>
      <div className="form-group">
          <label className="text-muted">Email</label>
          <input type="email" onChange={handleChange('email')} className="form-control" value={email} />
      </div>
      <div className="form-group">
          <label className="text-muted">Parola</label>
          <input type="password" onChange={handleChange('password')} className="form-control" value={password} />
      </div>

      <button onClick={clickSubmit} className="btn btn-primary">
          Onayla
      </button>
  </form>
);
 return(
  <Layout
  title="Kullanıcı Sayfası"
  description="Bilgilerinizi buradan değiştirebilir, siparişlerinizi takip edebilirsiniz."
  className="container col-md-8 offset-md-2"
>
<h2 className="mb-4">Profili güncelle</h2>
{profileUpdate(name,email,password)}
{redirectUser(success)}
</Layout>
 )
 
};
export default Profile;
