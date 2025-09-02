package dev.board.post

import org.springframework.stereotype.Repository
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicLong

interface PostRepository {
    fun saveNew(title: String, content: String, author: String): Post
    fun findById(id: Long): Post?
    fun findAll(keyword: String?, page: Int, size: Int): List<Post>
    fun count(keyword: String?): Long
    fun update(id: Long, title: String, content: String): Post
    fun delete(id: Long)
}

@Repository
class InMemoryPostRepository : PostRepository {
    private val seq = AtomicLong(0)
    private val store = ConcurrentHashMap<Long, Post>()

    override fun saveNew(title: String, content: String, author: String): Post {
        val id = seq.incrementAndGet()
        val p = Post(id, title, content, author)
        store[id] = p
        return p
    }

    override fun findById(id: Long) = store[id]

    override fun findAll(keyword: String?, page: Int, size: Int): List<Post> {
        val all = store.values
            .sortedByDescending { it.createdAt }
            .filter {
                if (keyword.isNullOrBlank()) true
                else it.title.contains(keyword, true) || it.content.contains(keyword, true)
            }
        val from = (page * size).coerceAtMost(all.size)
        val to = (from + size).coerceAtMost(all.size)
        return all.subList(from, to)
    }

    override fun count(keyword: String?): Long =
        store.values.count {
            if (keyword.isNullOrBlank()) true
            else it.title.contains(keyword, true) || it.content.contains(keyword, true)
        }.toLong()

    override fun update(id: Long, title: String, content: String): Post {
        val p = store[id] ?: throw NoSuchElementException("post $id not found")
        p.title = title
        p.content = content
        p.updatedAt = java.time.LocalDateTime.now()
        return p
    }

    override fun delete(id: Long) {
        if (store.remove(id) == null) throw NoSuchElementException("post $id not found")
    }
}
