package com.example.back_end.security;

import com.example.back_end.entity.Role;
import com.example.back_end.entity.User;
import org.jspecify.annotations.NullMarked;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;

@Getter
@Setter
public class CustomUserDetails implements UserDetails{
  private User user;

  public CustomUserDetails(User user) {
    this.user = user;
  }

  public Long getId() {
    return user.getId();
  }

  public String getFullName(){
    return user.getFullName();
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {

    System.out.println("=== GET AUTHORITIES ===");
    System.out.println("USER = " + user.getEmail());
    System.out.println("ROLES = " + user.getRoles());

    if (user.getRoles() == null || user.getRoles().isEmpty()) {
      System.out.println("❌ ROLES EMPTY");
    }

    return user.getRoles()
            .stream()
            .map(role -> {
              System.out.println("ROLE = " + role.getRoleName());
              return new SimpleGrantedAuthority("ROLE_" + role.getRoleName());
            })
            .toList();
  }

  @Override
  public String getPassword() {
    return user.getPasswordHash();
  }

  @Override
  public @NullMarked String getUsername() {
    return user.getEmail();
  }

  @Override
  public boolean isEnabled() {
    return Boolean.TRUE.equals(user.getIsActive())
            && !Boolean.TRUE.equals(user.getIsDeleted());
  }
}