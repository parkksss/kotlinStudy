package dev.board.post

import java.time.LocalDateTime
data class Post(
    val id: Long,
    var title: String,
    var content: String,
    var author: String,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    var updatedAt: LocalDateTime = LocalDateTime.now()
)
