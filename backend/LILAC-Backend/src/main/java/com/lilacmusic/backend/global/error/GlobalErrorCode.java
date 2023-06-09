package com.lilacmusic.backend.global.error;

import lombok.*;

/**
 * 프로젝트 내 사용되는 에러 코드
 */
@Getter
public enum GlobalErrorCode {
    /**
     * 에러코드 규칙 :
     * 1. 코드 맨 앞에는 연관된 Entity의 첫글자의 대문자를 적는다 ex) Member -> M
     * 2. 에러 코드와 이름 , 메시지가 최대한 모호하지 않게 작성.
     * 3. 공통으로 발생하는 에러에 대해서는 Global -> G를 붙여서 작성.
     */
    SUCCESS(200, "G000", "요청에 성공하였습니다."),
    OTHER(500, "G100", "서버에 오류가 발생했습니다."),
    METHOD_NOT_ALLOWED(405, "G200", "허용되지 않은 메서드입니다."),
    VALID_EXCEPTION(400, "G300", "올바르지 않은 형식입니다."),
    ACCESS_DENIED(401, "G400", "허용되지 않은 사용자입니다."),
    TOKEN_EXPIRED(401, "G500", "토큰이 만료되었습니다."),
    // 멤버와 관련된 Exception
    DUPLICATE_EMAIL(400, "M100", "중복된 이메일 입니다."),
    MEMBER_NOT_FOUND(400, "M200", "해당 id에 해당하는 사용자가 없습니다."),
    INCORRECT_ADMIN_INFO(400, "M300", "관리자 계정이 아닙니다."),
    NOT_OWNED(403, "M400", "해당 사용자가 보유한 음원이 아닙니다."),
    // 댓글과 관련된 Exception
    COMMENT_NOT_FOUND(404, "C100", "해당하는 댓글을 찾을 수 없습니다."),
    COMMENT_NOT_MINE(403, "C200", "다른 유저가 쓴 댓글입니다."),
    // 음원과 관련된 Exception
    MUSIC_NOT_FOUND(404, "MU100", "해당하는 음원을 찾을 수 없습니다."),
    MALFORMED_EXTENTION(400, "MU200", "잘못된 확장자입니다."),
    // 지원하지 않는 로그인 방식
    UNSUPPORTED_INFO(400, "O100", "지원하지 않는 로그인 방식입니다."),
    ALBUM_NOT_FOUND(404, "A100", "해당하는 앨범을 찾을 수 없습니다."),
    UPLOAD_FAIL(500, "A200", "업로드 과정에서 문제가 발생하였습니다."),
    MEDIA_CONVERT_FAIL(500, "A300", "미디어 변환 과정에서 문제가 발생하였습니다.");

    private final String code;
    private final String message;
    private final int status;

    GlobalErrorCode(final int status, final String code, final String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
