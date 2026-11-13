import { PostAPI } from './api.js';
import { debounce } from './utils.js';

export class PostApp {
    constructor() {
        this.allPosts = [];
        this.currentPage = 1;
        this.limit = 10;
        this.hasMore = true;
        this.isLoading = false;
        this.searchQuery = '';

        this.elements = {
            postList: document.getElementById('postList'),
            loader: document.getElementById('loader'),
            endMessage: document.getElementById('endMessage'),
            errorMessage: document.getElementById('errorMessage'),
            searchInput: document.getElementById('searchInput'),
            sentinel: document.getElementById('sentinel')
        };

        this.initObserver();
        this.initSearch();
    }

    async start() {
        await this.loadNextPage();
    }

    async loadNextPage() {
        if (this.isLoading || !this.hasMore) return;

        this.isLoading = true;
        this.showLoader(true);
        this.showError(null);

        try {
            // Искусственная задержка для наглядной демонстрации работы лоадера
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const newPosts = await PostAPI.getPosts(this.currentPage, this.limit);

            if (newPosts.length === 0) {
                this.hasMore = false;
                this.showEndMessage(true);
            } else {
                this.allPosts = [...this.allPosts, ...newPosts];
                this.currentPage++;
                this.render();
            }
        } catch (error) {
            console.error('Ошибка в приложении:', error);
            this.showError('Не удалось загрузить посты. Проверьте соединение.');
        } finally {
            this.isLoading = false;
            this.showLoader(false);
        }
    }

    getFilteredPosts() {
        if (!this.searchQuery) return this.allPosts;
        return this.allPosts.filter(post => 
            post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
    }

    render() {
        const postsToRender = this.getFilteredPosts();
        this.elements.postList.innerHTML = '';

        if (postsToRender.length === 0) {
            this.elements.postList.innerHTML = '<p style="text-align:center; color:#888;">Ничего не найдено</p>';
            return;
        }

        const fragment = document.createDocumentFragment();

        postsToRender.forEach(post => {
            const card = document.createElement('div');
            card.className = 'post-card';
            card.innerHTML = `
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
                <span class="post-author">Автор: User ${post.userId}</span>
            `;
            fragment.appendChild(card);
        });

        this.elements.postList.appendChild(fragment);
    }

    showLoader(isVisible) {
        this.elements.loader.classList.toggle('hidden', !isVisible);
    }

    showEndMessage(isVisible) {
        this.elements.endMessage.classList.toggle('hidden', !isVisible);
    }

    showError(message) {
        if (message) {
            this.elements.errorMessage.textContent = message;
            this.elements.errorMessage.classList.remove('hidden');
        } else {
            this.elements.errorMessage.classList.add('hidden');
        }
    }

    initSearch() {
        const onSearch = debounce((event) => {
            this.searchQuery = event.target.value.trim();
            this.render();
        }, 300);

        this.elements.searchInput.addEventListener('input', onSearch);
    }

    initObserver() {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !this.isLoading && this.hasMore) {
                this.loadNextPage();
            }
        }, {
            rootMargin: '100px',
            threshold: 0.1
        });

        observer.observe(this.elements.sentinel);
    }
}