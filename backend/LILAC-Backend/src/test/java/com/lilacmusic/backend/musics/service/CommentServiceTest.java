package com.lilacmusic.backend.musics.service;

import com.lilacmusic.backend.musics.dto.request.CommentRequest;
import com.lilacmusic.backend.musics.dto.response.CommentListResponse;
import com.lilacmusic.backend.musics.exceptions.NoCommentFoundException;
import com.lilacmusic.backend.musics.exceptions.NoMusicFoundException;
import com.lilacmusic.backend.musics.exceptions.NotMyCommentException;
import com.lilacmusic.backend.musics.model.entity.Comment;
import com.lilacmusic.backend.musics.model.entity.RecentComment;
import com.lilacmusic.backend.musics.model.mapping.CommentMapping;
import com.lilacmusic.backend.musics.model.repository.CommentRepository;
import com.lilacmusic.backend.musics.model.repository.RecentCommentRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
public class CommentServiceTest {

    @InjectMocks
    private CommentServiceImpl commentService;

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private RecentCommentRepository recentCommentRepository;

    @Mock
    private MusicService musicService;

    @Test
    @DisplayName("댓글 목록 가져오기 서비스, 성공 테스트")
    public void getCommentListTest() throws NoMusicFoundException {
        // Given
        String code = "test_music_code";
        Integer pageNumber = 1;
        Long memberId = 1L;
        Long musicId = 1L;

        CommentMapping comment1 = mock(CommentMapping.class);
        when(comment1.getCode()).thenReturn("comment1_code");
        when(comment1.getContent()).thenReturn("Comment 1");
        when(comment1.getPresentTime()).thenReturn(100);
        when(comment1.getCreatedTime()).thenReturn(LocalDateTime.of(2023, 05, 01, 01, 00, 00));
        when(comment1.getNickname()).thenReturn("User 1");
        when(comment1.getProfileImage()).thenReturn("user1_profile_image");
        when(comment1.getEmail()).thenReturn("user1@email.com");

        CommentMapping comment2 = mock(CommentMapping.class);
        when(comment2.getCode()).thenReturn("comment2_code");
        when(comment2.getContent()).thenReturn("Comment 2");
        when(comment2.getPresentTime()).thenReturn(200);
        when(comment2.getCreatedTime()).thenReturn(LocalDateTime.of(2023, 05, 01, 02, 00, 00));
        when(comment2.getNickname()).thenReturn("User 2");
        when(comment2.getProfileImage()).thenReturn("user2_profile_image");
        when(comment2.getEmail()).thenReturn("user2@email.com");

        List<CommentMapping> commentList = List.of(comment1, comment2);
        Page<CommentMapping> commentPage = new PageImpl<>(commentList, PageRequest.of(pageNumber - 1, 15, Sort.Direction.DESC, "createdTime"), commentList.size());

        // When
        when(musicService.getMusicIdByCode(code)).thenReturn(musicId);
        when(commentRepository.findAllByMusicId(eq(musicId), any(PageRequest.class))).thenReturn(commentPage);

        CommentListResponse response = commentService.getCommentList(code, pageNumber, memberId);

        // Then
        assertNotNull(response);
        assertEquals(2, response.getCommentList().size());
        assertEquals("comment1_code", response.getCommentList().get(0).getCode());
        assertEquals("Comment 1", response.getCommentList().get(0).getContent());
        assertEquals(100, response.getCommentList().get(0).getPresentTime());
        assertEquals("User 1", response.getCommentList().get(0).getMemberInfo().getNickname());
        assertEquals("user1_profile_image", response.getCommentList().get(0).getMemberInfo().getProfileImage());
        assertEquals("user1@email.com", response.getCommentList().get(0).getMemberInfo().getEmail());

        assertEquals("comment2_code", response.getCommentList().get(1).getCode());
        assertEquals("Comment 2", response.getCommentList().get(1).getContent());
        assertEquals(200, response.getCommentList().get(1).getPresentTime());
        assertEquals("User 2", response.getCommentList().get(1).getMemberInfo().getNickname());
        assertEquals("user2_profile_image", response.getCommentList().get(1).getMemberInfo().getProfileImage());
        assertEquals("user2@email.com", response.getCommentList().get(1).getMemberInfo().getEmail());
    }

    @Test
    @DisplayName("댓글 목록 가져오기 서비스, 빈 페이지 테스트")
    public void getCommentListEmptyTest() throws NoMusicFoundException {
        // Given
        String code = "test_music_code";
        Integer pageNumber = 1;
        Long memberId = 1L;
        Long musicId = 1L;

        List<CommentMapping> commentList = Collections.emptyList();
        Page<CommentMapping> commentPage = new PageImpl<>(commentList, PageRequest.of(pageNumber - 1, 15, Sort.Direction.DESC, "createdTime"), commentList.size());

        // When
        when(musicService.getMusicIdByCode(code)).thenReturn(musicId);
        when(commentRepository.findAllByMusicId(eq(musicId), any(PageRequest.class))).thenReturn(commentPage);

        CommentListResponse response = commentService.getCommentList(code, pageNumber, memberId);

        // Then
        assertNotNull(response);
        assertEquals(0, response.getCommentList().size());
        assertEquals(1, response.getNumber());
        assertEquals(0, response.getTotalPages());
        assertEquals(0, response.getTotalElements());
    }

    @Test
    @DisplayName("음악 댓글 생성, 최신 댓글이 없는 경우 테스트")
    public void createMusicCommentNoRecentCommentTest() throws NoMusicFoundException {
        // Given
        Long memberId = 1L;
        String musicCode = "test_music_code";
        Long musicId = 1L;
        String content = "Test comment";
        Integer presentTime = 120;
        CommentRequest commentRequest = CommentRequest.builder()
                .content(content)
                .presentTime(presentTime)
                .build();

        // When
        when(musicService.getMusicIdByCode(musicCode)).thenReturn(musicId);
        when(recentCommentRepository.getRecentCommentByMusicIdAndPresentTime(musicId, presentTime)).thenReturn(Optional.empty());
        commentService.createMusicComment(memberId, commentRequest, musicCode);

        // Then
        verify(commentRepository, times(1)).save(any(Comment.class));
        verify(recentCommentRepository, times(1)).save(any(RecentComment.class));
    }

    @Test
    @DisplayName("음악 댓글 생성, 최신 댓글이 있는 경우 테스트")
    public void createMusicCommentWithRecentCommentTest() throws NoMusicFoundException {
        // Given
        Long memberId = 1L;
        String musicCode = "test_music_code";
        Long musicId = 1L;
        String content = "Test comment";
        Integer presentTime = 120;
        CommentRequest commentRequest = CommentRequest.builder()
                .content(content)
                .presentTime(presentTime)
                .build();
        RecentComment existingRecentComment = RecentComment.builder()
                .recentCommentId(1L)
                .memberId(memberId)
                .musicId(musicId)
                .content("Existing recent comment")
                .presentTime(presentTime)
                .build();

        // When
        when(musicService.getMusicIdByCode(musicCode)).thenReturn(musicId);
        when(recentCommentRepository.getRecentCommentByMusicIdAndPresentTime(musicId, presentTime)).thenReturn(Optional.of(existingRecentComment));
        commentService.createMusicComment(memberId, commentRequest, musicCode);

        // Then
        verify(commentRepository, times(1)).save(any(Comment.class));
        verify(recentCommentRepository, times(1)).save(any(RecentComment.class));
    }

    @Test
    @DisplayName("음악 댓글 삭제 테스트 - 댓글이 없는 경우")
    public void deleteMusicCommentNoCommentFoundTest() {
        // Given
        Long memberId = 1L;
        String musicCode = "test_music_code";
        String commentCode = "test_comment_code";

        // When
        when(commentRepository.findByCode(commentCode)).thenReturn(Optional.empty());

        // Then
        assertThrows(NoCommentFoundException.class, () -> commentService.deleteMusicComment(memberId, musicCode, commentCode));
    }

    @Test
    @DisplayName("음악 댓글 삭제 테스트 - 다른 유저의 댓글")
    public void deleteMusicCommentNotMyCommentTest() {
        // Given
        Long memberId = 1L;
        String musicCode = "test_music_code";
        String commentCode = "test_comment_code";
        Comment comment = Comment.builder()
                .commentId(1L)
                .memberId(2L)
                .musicId(1L)
                .code(commentCode)
                .content("Test comment")
                .presentTime(120)
                .createdTime(LocalDateTime.now())
                .build();

        // When
        when(commentRepository.findByCode(commentCode)).thenReturn(Optional.of(comment));

        // Then
        assertThrows(NotMyCommentException.class, () -> commentService.deleteMusicComment(memberId, musicCode, commentCode));
    }

    @Test
    @DisplayName("음악 댓글 삭제 테스트 - 정상 삭제")
    public void deleteMusicCommentSuccessTest() throws NoCommentFoundException, NotMyCommentException {
        // Given
        Long memberId = 1L;
        String musicCode = "test_music_code";
        String commentCode = "test_comment_code";
        Comment comment = Comment.builder()
                .commentId(1L)
                .memberId(memberId)
                .musicId(1L)
                .code(commentCode)
                .content("Test comment")
                .presentTime(120)
                .createdTime(LocalDateTime.now())
                .build();
        RecentComment recentComment = RecentComment.builder()
                .recentCommentId(1L)
                .memberId(memberId)
                .musicId(1L)
                .content("Test comment")
                .presentTime(120)
                .build();

        // When
        when(commentRepository.findByCode(commentCode)).thenReturn(Optional.of(comment));
        when(recentCommentRepository.getRecentCommentByMusicIdAndPresentTime(comment.getMusicId(), comment.getPresentTime()))
                .thenReturn(Optional.of(recentComment));

        // Then
        Long deletedCommentId = commentService.deleteMusicComment(memberId, musicCode, commentCode);
        assertEquals(comment.getCommentId(), deletedCommentId);
        verify(commentRepository, times(1)).delete(comment);
        verify(recentCommentRepository, times(1)).delete(recentComment);
    }

    @Test
    @DisplayName("음악 댓글 삭제 테스트 - 최신 댓글이 내가 지우려는 댓글과 다른 경우")
    public void deleteMusicCommentDifferentRecentCommentTest() throws NoCommentFoundException, NotMyCommentException {
        // Given
        Long memberId = 1L;
        String musicCode = "test_music_code";
        String commentCode = "test_comment_code";
        Comment comment = Comment.builder()
                .commentId(1L)
                .memberId(memberId)
                .musicId(1L)
                .code(commentCode)
                .content("Test comment")
                .presentTime(120)
                .createdTime(LocalDateTime.now())
                .build();
        RecentComment recentComment = RecentComment.builder()
                .recentCommentId(1L)
                .memberId(memberId)
                .musicId(1L)
                .content("Another test comment")
                .presentTime(120)
                .build();

        // When
        when(commentRepository.findByCode(commentCode)).thenReturn(Optional.of(comment));
        when(recentCommentRepository.getRecentCommentByMusicIdAndPresentTime(comment.getMusicId(), comment.getPresentTime()))
                .thenReturn(Optional.of(recentComment));

        // Then
        Long deletedCommentId = commentService.deleteMusicComment(memberId, musicCode, commentCode);
        assertEquals(comment.getCommentId(), deletedCommentId);
        verify(commentRepository, times(1)).delete(comment);
        verify(recentCommentRepository, times(0)).delete(recentComment);
    }

    @Test
    @DisplayName("음악 댓글 삭제 테스트 - 최신 댓글이 없는 경우")
    public void deleteMusicCommentNoRecentCommentTest() throws NoCommentFoundException, NotMyCommentException {
        // Given
        Long memberId = 1L;
        String musicCode = "test_music_code";
        String commentCode = "test_comment_code";
        Comment comment = Comment.builder()
                .commentId(1L)
                .memberId(memberId)
                .musicId(1L)
                .code(commentCode)
                .content("Test comment")
                .presentTime(120)
                .createdTime(LocalDateTime.now())
                .build();

        // When
        when(commentRepository.findByCode(commentCode)).thenReturn(Optional.of(comment));
        when(recentCommentRepository.getRecentCommentByMusicIdAndPresentTime(comment.getMusicId(), comment.getPresentTime()))
                .thenReturn(Optional.empty());

        // Then
        Long deletedCommentId = commentService.deleteMusicComment(memberId, musicCode, commentCode);
        assertEquals(comment.getCommentId(), deletedCommentId);
        verify(commentRepository, times(1)).delete(comment);
        verify(recentCommentRepository, times(0)).delete(any(RecentComment.class));
    }
}
