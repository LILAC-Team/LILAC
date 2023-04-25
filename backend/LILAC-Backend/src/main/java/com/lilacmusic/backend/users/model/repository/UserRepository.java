package com.lilacmusic.backend.users.model.repository;

import com.lilacmusic.backend.albums.model.entitiy.Album;
import com.lilacmusic.backend.users.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> getUserByEmail(String email);
}
