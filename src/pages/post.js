import MainLayout from './../layout/main';
import dayjs from 'dayjs';
import s from './../styles/pages/post.module.scss';
import { useForm } from './../core/useForm';
import { showError } from './../core/customValidators';
import { config } from './../config';
import axios from 'axios';
import { useState } from 'react';

import Breadcrumps from './../components/breadcrumps';
import SidebarPost from './../components/sidebar-post';

export default function PostPage ({ post, lastPosts }) {
  const breadcrumps = [
    {
      text: 'Home',
      href: '/'
    },
    ...((post.categories) || []).map(category => ({
      text: category.title,
      href: `/posts?categoria=${category.slug}`
    })),
    {
      text: post.title,
      href: `/posts/${post.slug}`
    }
  ];
  const comments = post.comments.filter(comment => !comment.archived);

  const [isLoading, setIsLoading] = useState(false);
  const [formValue, isFormValid, updateInputValue] = useForm({
    authorName: { value: '', isRequired: true },
    email: { value: '', isRequired: true },
    company: { value: '', isRequired: false },
    content: { value: '', isRequired: true }
  });

  const submit = async () => {
    try {
      setIsLoading(true);

      const requestMutation = `
        mutation CreateCommentMutation (
          $input: CreateCommentParams!
        ) {
          createComment (
            input: $input
          ) {
            author {
              name
              company
            }
            content
          }
        }
      `;

      const { data: response } = await axios.post(config.baseUrl, {
        query: requestMutation,
        variables: {
          input: {
            author: {
              name: formValue?.authorName?.value,
              email: formValue?.email?.value,
              company: formValue?.company?.value
            },
            content: formValue?.content?.value,
            postId: post.id
          }
        }
      });

      if (response.errors && response.errors.length) {
        throw new Error(response.errors[0].message);
      }

      alert('Comentário enviado com sucesso!');

      const comment = (response.data && response.data.createComment);

      if (comment && comment.content) {
        post.comments.push(comment);
      }

      updateInputValue('content', '');
    } catch (err) {
      console.error(err);
      alert('Um erro inesperado aconteceu, por favor, tente novamente mais tarde');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout contents={post}>
      <div className={`${s['post']} main-wrapper`}>
        <div className={s['post__head']} style={{
          backgroundImage: `url(${post.imageUrl})`
        }}>
          <Breadcrumps
            breadcrumps={(post.categories || []).map(category => ({ text: category.title, href: `/posts?categoria=${category.slug}` }))}
            color={'background'}
          />

          <h1 className={s['post__head__title']}>
            {post.title}
          </h1>

          <div className={s['post-social']}>
            <div className={s['post-social__wrapper']}>
              <img
                className={s['post-social__author-image']}
                src={post.author.image || '/default-user-image.png'}
                alt={post.author.name} />

              <div className={s['post-social__post-info']}>
                <span className={s['post-social__author-name']}>
                  {post.author.name}
                </span>
                <span className={s['post-social__updated_at']}>
                  {dayjs(post.updatedAt).locale('pt-br').format('MMMM D, YYYY')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Breadcrumps breadcrumps={breadcrumps} top />

        <div className={s['post__wrapper']}>
          <div>
            <div className={s['post__content']} dangerouslySetInnerHTML={{ __html: post.content}}></div>

            <div className={s['comments']}>
              {comments.length ? <h2 className={s['comments__title']}>Comentários</h2> : ''}

              {comments.map((comment, index) => {
                return (
                  <div className={s['comment']} key={`comment-${index}`}>
                    <span className={s['comment__author-name']}>
                      {comment.author.name}
                      {comment.author.company && ' - ' + comment.author.company}
                    </span>
                    <span className={s['comment__created-at']}>
                      {dayjs(comment.createdAt).locale('pt-br').format('HH:mm MMMM D, YYYY')}
                    </span>
                    <p className={s['comment__content']}>{comment.content}</p>
                  </div>
                );
              })}

              <h2 className={s['comments__title']}>Deixe o seu comentário</h2>
              <p className={s['comments__description']}>
                Seu endereço de e-mail não será publicado. Os campos obrigatórios estão marcados com *
              </p>

              <div className={s['comments__form-wrapper']}>
                <label className={s['comments__input']} htmlFor="authorName">
                  <span className={s['comments__input-label']}>Nome completo*</span>
                  <input type="text" name='authorName' onChange={event => updateInputValue('authorName', event.target.value)} />
                  {showError(formValue?.authorName, 'required') && <span className={s['comments__input-error']}>Esse campo é obrigatório</span>}
                </label>

                <label className={s['comments__input']} htmlFor="email">
                  <span className={s['comments__input-label']}>Seu email*</span>
                  <input type="email" name='email' onChange={event => updateInputValue('email', event.target.value)} />
                  {showError(formValue?.email, 'required') && <span className={s['comments__input-error']}>Esse campo é obrigatório</span>}
                </label>

                <label className={s['comments__input']} htmlFor="company">
                  <span className={s['comments__input-label']}>Escritório</span>
                  <input type="text" name='company' onChange={event => updateInputValue('company', event.target.value)} />
                </label>
              </div>

              <div className={s['comments__form-wrapper']}>
                <label className={s['comments__input']} htmlFor="content">
                  <span className={s['comments__input-label']}>Escreva seu comentário aqui... *</span>
                  <textarea
                    name='content' maxLength={5000} rows={10}
                    value={formValue?.content.value} onChange={event => updateInputValue('content', event.target.value)}>
                  </textarea>
                  {showError(formValue?.content, 'required') && <span className={s['comments__input-error']}>Esse campo é obrigatório</span>}
                </label>
              </div>

              <button className={s['comments__submit']} onClick={submit} disabled={!isFormValid}>Enviar comentário</button>
            </div>
          </div>

          <div className={s['post__sidebar']}>
            <h4 className={s['post__sidebar__title']}>
              Ultimos posts
            </h4>

            <div className={s['post__sidebar__posts']}>
              <SidebarPost post={lastPosts[0]}></SidebarPost>
              <SidebarPost post={lastPosts[1]}></SidebarPost>
              <SidebarPost post={lastPosts[2]}></SidebarPost>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <div className={s['post-loading']}>Carregando...</div>}
    </MainLayout>
  );
}
