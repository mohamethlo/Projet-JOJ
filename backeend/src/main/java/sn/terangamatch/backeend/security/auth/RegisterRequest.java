package sn.terangamatch.backeend.security.auth;


import lombok.Data;
import sn.terangamatch.backeend.model.UserRole;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private UserRole role;
}

