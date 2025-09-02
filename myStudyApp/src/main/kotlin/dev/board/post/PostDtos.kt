package dev.board.post

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size
import java.time.LocalDateTime

data class PostCreateReq(
    @field:NotBlank @field:Size(max = 200) val title: String,
    @field:NotBlank val content: String,
    @field:NotBlank @field:Size(max = 100) val author: String
)
data class PostUpdateReq(
    @field:NotBlank @field:Size(max = 200) val title: String,
    @field:NotBlank val content: String
)

data class PostRes(
    val id: Long, val title: String, val content: String, val author: String,
    val createdAt: LocalDateTime, val updatedAt: LocalDateTime
) {
    companion object {
        fun from(p: Post) = PostRes(p.id, p.title, p.content, p.author, p.createdAt, p.updatedAt)
    }
}
