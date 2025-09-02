package dev.board.post

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class PostService(private val repo: PostRepository) {
    @Transactional
    fun create(req: PostCreateReq) = PostRes.from(repo.saveNew(req.title, req.content, req.author))

    @Transactional(readOnly = true)
    fun get(id: Long) = PostRes.from(repo.findById(id) ?: throw NoSuchElementException("post $id not found"))

    data class PageRes<T>(val content: List<T>, val totalElements: Long, val totalPages: Int, val number: Int, val size: Int)

    @Transactional(readOnly = true)
    fun list(page: Int, size: Int, keyword: String?): PageRes<PostRes> {
        val items = repo.findAll(keyword, page, size).map { PostRes.from(it) }
        val total = repo.count(keyword)
        val pages = if (total == 0L) 1 else Math.ceil(total.toDouble() / size).toInt()
        return PageRes(items, total, pages, page, size)
    }

    @Transactional
    fun update(id: Long, req: PostUpdateReq) = PostRes.from(repo.update(id, req.title, req.content))

    @Transactional
    fun delete(id: Long) = repo.delete(id)
}
