package dev.board.post

import jakarta.validation.Valid
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/posts")
class PostController(private val svc: PostService) {
    @PostMapping fun create(@RequestBody @Valid req: PostCreateReq) = svc.create(req)
    @GetMapping("/{id}") fun get(@PathVariable id: Long) = svc.get(id)
    @GetMapping fun list(
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "10") size: Int,
        @RequestParam(required = false) keyword: String?
    ) = svc.list(page, size, keyword)
    @PutMapping("/{id}") fun update(@PathVariable id: Long, @RequestBody @Valid req: PostUpdateReq) = svc.update(id, req)
    @DeleteMapping("/{id}") fun delete(@PathVariable id: Long) = svc.delete(id)
}
