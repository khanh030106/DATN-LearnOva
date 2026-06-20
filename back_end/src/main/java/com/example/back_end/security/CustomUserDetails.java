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

    return user.getRoles()
            .stream()
            .map(role ->
                    new SimpleGrantedAuthority(role.getRoleName().name())
            )
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