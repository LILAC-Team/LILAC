package com.lilacmusic.backend.global.error;

import com.lilacmusic.backend.global.common.BaseResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/error")
@RequiredArgsConstructor
@Slf4j
public class GlobalErrorController {

    @GetMapping("/jwt")
    public ResponseEntity<BaseResponse<Object>> JwtException(){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new BaseResponse<>(GlobalErrorCode.ACCESS_DENIED));
    }
}
