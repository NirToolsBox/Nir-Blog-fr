---
layout: default
title: Articles
permalink: /blog/
---

<section class="filters">
    <div class="search-bar">
        <input type="text" id="searchInput" placeholder="Search for an article...">
    </div>
    <div class="filter-group">
        <select id="categoryFilter">
            <option value="">All Categories</option>
            {% for category in site.categories %}
            <option value="{{ category[0] }}">{{ category[0] }}</option>
            {% endfor %}
        </select>
        <select id="dateFilter">
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest</option>
        </select>
    </div>
</section>

<section class="post-grid" id="postsContainer">
    {% for post in site.posts %}
    <article class="post-card" data-category="{{ post.category }}" data-date="{{ post.date | date_to_xmlschema }}">
        <div class="post-content">
            <span class="post-category">{{ post.category }}</span>
            <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
            <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
            <div class="post-meta">
                <time>{{ post.date | date: "%B %d, %Y" }}</time>
                <span>•</span>
                <span>{% include reading-time.html content=post.content %}</span>
            </div>
            <a href="{{ post.url | relative_url }}" class="post-readmore">Read More &rarr;</a>
        </div>
    </article>
    {% endfor %}
</section>