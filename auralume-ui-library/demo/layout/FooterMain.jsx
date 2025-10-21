import React, { useState } from 'react'
import { Avatar, Button, ToastContainer, useToast } from '../../src';

const FooterMain = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);  
  const { toasts, success, error, warning, info, removeToast } = useToast();

  const handleSubscribe = async () => {
  if (!email) return error('Error!', "Please Enter an email",{
    position: 'top-center'
  });

  try {
    setLoading(true);
    const res = await fetch("https://auralume-backend.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.text();
    if(data === "Subscribed successfully!"){
    success('Success!',data,{
      position: 'top-center'
    })
  setLoading(false);
} else if(data === "Already subscribed"){
      warning('warning!', data,{
        position: 'top-center'
      })
      setLoading(false);
    };
    setEmail(""); // optional: clear input after subscribing
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
    setLoading(false);
  }
};

    
  return (
   <div style={{ 
    display: 'flex', 
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: isMobile ? 'center' : 'center',
    justifyContent: 'space-between',
    gap: isMobile ? '2rem' : '1rem',
  }}>
    <div>
    <div style={{
      display: 'flex', 
      alignItems: 'center', 
      gap: '1rem'
    }}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Avatar 
          src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/user.png" 
          alt="Aditya Mondal" 
          size="small" 
          variant="circle" 
        />
      </div>
      <div>
        <p style={{margin: 0}}>created by</p>
        <h3 style={{margin: '0.25rem 0 0 0'}}><b>Aditya Mondal</b></h3>
      </div>
    </div>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', padding: '20px'}}>
    <div 
      onClick={() => window.open("https://www.linkedin.com/in/aditya-mondal-aa9658288/", "_blank")}
    >
      <svg 
        className="w-6 h-6 text-gray-800 dark:text-white hover:text-[#00f5ff] cursor-pointer" 
        aria-hidden="true" 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          fillRule="evenodd" 
          d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" 
          clipRule="evenodd"
        />
        <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
      </svg>
    </div>

<div onClick={() => window.open("https://github.com/Aditya02git", "_blank")}>
    <svg className="w-6 h-6 text-gray-800 dark:text-white hover:text-[#00f5ff] cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/>
    </svg>
    </div>
    </div>

</div>


    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1rem',
      width: isMobile ? '100%' : 'auto'
    }}>
      <p style={{margin: 0}}><b>Get the AuraLume UI updates and news</b></p>
        <div style={{
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center', 
          gap: '0.5rem'
        }}>
          <input
            type="text"
            placeholder="email@site.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: isMobile ? "100%" : "250px",
              padding: "6px 12px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              outline: "none",
              backgroundColor: "#fff",
              transition: "all 0.2s ease-in-out",
              boxSizing: "border-box",
              color: '#000'
            }}
            onFocus={(e) => {
              e.target.style.border = "1px solid #007BFF";
              e.target.style.boxShadow = "0 0 6px rgba(0, 123, 255, 0.5)";
            }}
            onBlur={(e) => {
              e.target.style.border = "1px solid #ccc";
              e.target.style.boxShadow = "none";
            }}
          />
          <Button size='small' onClick={handleSubscribe} disabled={loading}>
            {loading ? "Loading..." : "Subscribe"}
          </Button>
          <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
        </div>
      <p style={{
        fontSize: '11px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.2rem',
        margin: 0
      }}>
        <img 
          src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/shield.png" 
          alt="verified" 
          height="11px" 
          width="11px"
        /> 
        We don't share your email address with anyone
      </p>
    </div>
  </div>
  )
}

export default FooterMain