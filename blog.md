---
layout: default
title: Articles
permalink: /blog/
---

<section class="filters">
    <div class="search-bar">
        <input type="text" id="searchInput" placeholder="Rechercher un article...">
    </div>
    
    <div class="filter-group">
        <select id="categoryFilter">
            <option value="">Toutes les catégories</option>
            {% for category in site.categories %}
            <option value="{{ category[0] }}">{{ category[0] }}</option>
            {% endfor %}
        </select>
        
        <select id="dateFilter">
            <option value="recent">Plus récents</option>
            <option value="oldest">Plus anciens</option>
        </select>
    </div>
</section>

<section class="post-grid" id="postsContainer">
    {% for post in site.posts %}
    <article class="post-card" data-category="{{ post.category }}" data-date="{{ post.date | date_to_xmlschema }}">
        <div class="post-content">
            <span class="post-category">{{ post.category }}</span>
            <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
            <div class="post-meta">
                <time>{{ post.date | date: "%d/%m/%Y" }}</time>
                <span>•</span>
                <span>{% include reading-time.html %}</span>
            </div>
            <p class="post-excerpt">{{ post.excerpt }}</p>
        </div>
    </article>
    {% endfor %}
</section>