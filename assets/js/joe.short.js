document.addEventListener('DOMContentLoaded', () => {
	class JoeMlist extends HTMLElement {
		constructor() {
			super();
			this.options = {
				id: this.getAttribute('id'),
				width: this.getAttribute('width') || '100%',
				autoplay: this.getAttribute('autoplay') ? 1 : 0
			};
			this.render();
		}
		get template() {
			return `<iframe allowfullscreen="true" style="display: block; margin: 0 auto; border: 0;" width="${this.options.width}" height="450px" src="//music.163.com/outchain/player?type=0&id=${this.options.id}&auto=${this.options.autoplay}&height=430"></iframe>`;
		}
		render() {
			if (this.options.id) this.innerHTML = this.template;
			else this.innerHTML = '网易云歌单ID未填写！';
		}
	}
	window.customElements.define('joe-mlist', JoeMlist);
	class JoeMusic extends HTMLElement {
		constructor() {
			super();
			this.options = {
				id: this.getAttribute('id'),
				width: this.getAttribute('width') || '100%',
				autoplay: this.getAttribute('autoplay') ? 1 : 0
			};
			this.render();
		}
		get template() {
			return `<iframe allowfullscreen="true" style="display: block; margin: 0 auto; border: 0;" width="${this.options.width}" height="86px" src="//music.163.com/outchain/player?type=2&id=${this.options.id}&auto=${this.options.autoplay}&height=66"></iframe>`;
		}
		render() {
			if (this.options.id) this.innerHTML = this.template;
			else this.innerHTML = '网易云歌曲ID未填写！';
		}
	}
	window.customElements.define('joe-music', JoeMusic);
	class JoeBilibili extends HTMLElement {
		constructor() {
			super();
			this.options = {
				bvid: this.getAttribute('bvid')
			};
			this.render();
		}
		get template() {
			return `<iframe allowfullscreen="true" class="joe_detail__article-player" style="display: block; margin: 0 auto; border: 0;" width="100%" height="180px" src="//player.bilibili.com/player.html?bvid=${this.options.bvid}"></iframe>`;
		}
		render() {
			if (this.options.bvid) this.innerHTML = this.template;
			else this.innerHTML = 'Bvid未填写！';
		}
	}
	window.customElements.define('joe-bilibili', JoeBilibili);
	class JoeDplayer extends HTMLElement {
		constructor() {
			super();
			this.options = {
				src: this.getAttribute('src'),
				player: this.getAttribute('player')
			};
			this.render();
		}
		get template() {
			return `<iframe allowfullscreen="true" class="joe_detail__article-player" style="display: block; margin: 0 auto; border: 0;" width="100%" height="180px" src="${this.options.player + this.options.src}"></iframe>`;
		}
		render() {
			if (this.options.src) this.innerHTML = this.template;
			else this.innerHTML = '播放地址未填写！';
		}
	}
	window.customElements.define('joe-dplayer', JoeDplayer);
	class JoeMtitle extends HTMLElement {
		constructor() {
			super();
			this.options = {
				title: this.getAttribute('title') || '默认标题'
			};
			this.innerHTML = this.template;
		}
		get template() {
			return `<div class="joe_detail__article-mtitle"><span class="text">${this.options.title}</span></div>`;
		}
	}
	window.customElements.define('joe-mtitle', JoeMtitle);



	/* 便条按钮 */
	class JoeAnote extends HTMLElement {
		constructor() {
			super();
			this.options = {
				icon: this.getAttribute('icon') || 'fa-download',
				href: this.getAttribute('href') || '#',
				type: /^secondary$|^success$|^warning$|^error$|^info$/.test(this.getAttribute('type')) ? this.getAttribute('type') : 'secondary',
				content: this.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, '') || '标签按钮'
			};
			this.render();
		}
		get template() {
			return `
                <a class="joe_detail__article-anote ${this.options.type}" href="${this.options.href}" target="_blank" rel="noopener noreferrer nofollow">
                    <span class="icon"><i class="fa ${this.options.icon}"></i></span><span class="content">${this.options.content}</span>
                </a>
            `;
		}
		render() {
			this.innerHTML = this.template;
		}
	}
	window.customElements.define('joe-anote', JoeAnote);
	/* 多彩按钮 */
	class JoeAbtn extends HTMLElement {
		constructor() {
			super();
			this.options = {
				icon: this.getAttribute('icon') || '',
				color: this.getAttribute('color') || '#ff6800',
				href: this.getAttribute('href') || '#',
				radius: this.getAttribute('radius') || '17.5px',
				content: this.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, '') || '多彩按钮'
			};
			this.render();
		}
		get template() {
			return `
                <a class="joe_detail__article-abtn" style="background: ${this.options.color}; border-radius: ${this.options.radius}" href="${this.options.href}" target="_blank" rel="noopener noreferrer nofollow">
                    <span class="icon"><i class="${this.options.icon} fa"></i></span><span class="content">${this.options.content}</span>
                </a>
            `;
		}
		render() {
			this.innerHTML = this.template;
		}
	}
	window.customElements.define('joe-abtn', JoeAbtn);
	/* 点击复制 */
	class JoeCopy extends HTMLElement {
		constructor() {
			super();
			this.options = {
				text: this.getAttribute('text') || '默认文本',
				content: this.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, '') || '点击复制'
			};
			this.render();
		}
		get template() {
			return `<span class="joe_detail__article-copy">${this.options.content}</span>`;
		}
		render() {
			this.innerHTML = this.template;
			this.event();
		}
		event() {
			this.$copy = this.querySelector('.joe_detail__article-copy');
			new ClipboardJS(this.$copy, { text: () => this.options.text }).on('success', () => Qmsg.success('复制成功！'));
		}
	}
	window.customElements.define('joe-copy', JoeCopy);
	/* 消息提示 */
	class JoeMessage extends HTMLElement {
		constructor() {
			super();
			this.options = {
				type: /^success$|^info$|^warning$|^error$/.test(this.getAttribute('type')) ? this.getAttribute('type') : 'info',
				content: this.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, '') || '提示内容'
			};
			this.render();
		}
		get template() {
			return `
				<div class="joe_detail__article-message ${this.options.type}">
					<div class="icon"></div>
					<div class="content">${this.options.content}</div>
				</div>
			`;
		}
		render() {
			this.innerHTML = this.template;
		}
	}
	window.customElements.define('joe-message', JoeMessage);
	/* 默认卡片 */
	class JoeCard extends HTMLElement {
		constructor() {
			super();
			this.options = {
				width: this.getAttribute('width') || '100%',
				label: this.getAttribute('label') || '默认标题',
				content: this.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, '') || '默认内容'
			};
			this.render();
		}
		get template() {
			return `
                <div class="joe_detail__article-card" style="width: ${this.options.width}">
                    <div class="title">${this.options.label}</div>
                    <div class="content">${this.options.content}</div>
                </div>
            `;
		}
		render() {
			this.innerHTML = this.template;
		}
	}
	window.customElements.define('joe-card', JoeCard);
	/* 回复可见 - 显示状态 */
	class JoeShow extends HTMLElement {
		constructor() {
			super();
			this.options = {
				content: this.innerHTML.trim().replace(/^(<br>)|(<br>)$/g, '') || '默认隐藏的内容'
			};
			this.render();
		}
		render() {
			this.innerHTML = this.options.content;
		}
	}
	window.customElements.define('joe-show', JoeShow);
	/* 时间轴 */
	class JoeTimeline extends HTMLElement {}
	/*
	 *
	 *
	 * *
	 * 私有化组件
	 * *
	 *
	 *
	 */

	/* 回复可见 - 隐藏状态 */
	class JoeHide extends HTMLElement {
		constructor() {
			super();
			this.render();
		}
		get template() {
			return `
                <style>
                    .container {
                        background: repeating-linear-gradient(145deg, var(--classD), var(--classD) 15px, var(--background) 0, var(--background) 25px);
                        padding: 15px 0;
                        text-align: center;
                        position: relative;
                        user-select: none;
                        line-height: normal;
                    }
                    .container i {
                        position: relative;
                        font-style: normal;
                        cursor: pointer;
                        color: var(--theme);
                    }
                </style>
                <div class="container">
                    此处内容作者设置了 <i>回复</i> 可见
                </div>
            `;
		}
		render() {
			this.innerHTML = '';
			this._shadowRoot = this.attachShadow({ mode: 'closed' });
			this._shadowRoot.innerHTML = this.template;
			this.event();
		}
		event() {
			this.$button = this._shadowRoot.querySelector('i');
			this.$button.addEventListener('click', () => {
				const top = $('.joe_comment').offset().top - $('.joe_header').height() - 15;
				window.scrollTo({ top, behavior: 'smooth' });
			});
		}
	}
	window.customElements.define('joe-hide', JoeHide);
});
