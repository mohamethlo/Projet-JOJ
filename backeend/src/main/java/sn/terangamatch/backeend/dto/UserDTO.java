package sn.terangamatch.backeend.dto;


import lombok.*;
import sn.terangamatch.backeend.model.UserRole;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String email;
    private UserRole role;
    private LocalDateTime createdAt;
}
