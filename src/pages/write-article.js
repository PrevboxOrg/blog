import MainLayout from './../layout/main';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw } from 'draft-js';
import { useForm } from './../core/useForm';
const Editor = dynamic(() => import('react-draft-wysiwyg').then(m => m.Editor), { ssr: false });
import draftToHtml from 'draftjs-to-html';
import s from './../styles/pages/write-article.module.scss';
import { showError } from './../core/customValidators';
import { config } from './../config';
import axios from 'axios';
import { useState } from 'react';

export default function WriteArticlePage () {
  const contents = {
    TITLE: 'Artigos',
    META: [
      { TYPE: 'description', VALUE: 'Artigos Prevbox' }
    ]
  };

  const [isLoading, setIsLoading] = useState(false);

  const [formValue, isFormValid, updateInputValue, updateInputValidity] = useForm({
    title: { value: '', isRequired: true },
    description: { value: '', isRequired: true },
    imageUrl: { value: '', isRequired: true },
    authorName: { value: '', isRequired: true },
    authorImage: { value: '', isRequired: false },
    email: { value: '', isRequired: true },
    content: { value: EditorState.createEmpty(), isRequired: true },
  });

  const submit = async () => {
    try {
      setIsLoading(true);

      const requestMutation = `
        mutation CreateRequestMutation (
          $input: CreateRequestParams!
        ) {
          createRequest (
            input: $input
          ) {
            id
          }
        }
      `;

      const { data: response } = await axios.post(config.baseUrl, {
        query: requestMutation,
        variables: {
          input: {
            title: formValue?.title?.value,
            description: formValue?.description?.value,
            imageUrl: formValue?.imageUrl?.value,
            author: {
              name: formValue?.authorName?.value,
              image: formValue?.authorImage?.value
            },
            email: formValue?.email?.value,
            content: draftToHtml(convertToRaw(formValue?.content?.value?.getCurrentContent()))
          }
        }
      });

      if (response.errors && response.errors.length) {
        if (response.errors[0].message === 'Slug is already taken') {
          alert('Esse titulo já está sendo usado, por favor, tente outro');
          return;
        }

        throw new Error(response.errors[0].message);
      }

      alert('Solicitação enviada com sucesso!');
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      alert('Um erro inesperado aconteceu, por favor, tente novamente mais tarde');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout contents={contents}>
      <div className={`main-wrapper ${s['article']}`}>
        <div className={s['article__wrapper']}>
          <label className={s['article__input']} htmlFor="title">
            <input type="text" placeholder='Título*' name='title' onChange={event => updateInputValue('title', event.target.value)} />
            {showError(formValue?.title, 'required') && <span className={s['article__input-error']}>Esse campo é obrigatório</span>}
          </label>

          <label className={s['article__input']} htmlFor="description">
            <input type="text" placeholder='Descrição*' name='description' onChange={event => updateInputValue('description', event.target.value)} />
            {showError(formValue?.description, 'required') && <span className={s['article__input-error']}>Esse campo é obrigatório</span>}
          </label>

          <label className={s['article__input']} htmlFor="imageUrl">
            <input type="text" placeholder='Link da imagem*' name='imageUrl' onChange={event => updateInputValue('imageUrl', event.target.value)} />
            {showError(formValue?.imageUrl, 'required') && <span className={s['article__input-error']}>Esse campo é obrigatório</span>}
          </label>
        </div>

        <Editor
          editorState={formValue?.content?.value}
          onEditorStateChange={(value) => updateInputValue('content', value)}
          wrapperClassName={s['article__editor']}
          editorClassName={s['article__editor-text']}
          toolbarClassName={s['article__editor-header']}/>

        <div className={s['article__wrapper']}>
          <label className={s['article__input']} htmlFor="authorName">
            <input type="text" placeholder='Seu nome*' name='authorName' onChange={event => updateInputValue('authorName', event.target.value)} />
            {showError(formValue?.authorName, 'required') && <span className={s['article__input-error']}>Esse campo é obrigatório</span>}
          </label>

          <label className={s['article__input']} htmlFor="email">
            <input type="email" placeholder='Seu email* (Permanecerá anônimo)' name='email' onChange={event => updateInputValue('email', event.target.value)} />
            {showError(formValue?.email, 'required') && <span className={s['article__input-error']}>Esse campo é obrigatório</span>}
          </label>

          <label className={s['article__input']} htmlFor="authorImage">
            <input type="text" placeholder='Link da imagem do autor' name='authorImage' onChange={event => updateInputValue('authorImage', event.target.value)} />
          </label>
        </div>

        <div className={s['article__wrapper']}>
          <button className={s['article__submit']} onClick={submit} disabled={!isFormValid}>Enviar artigo</button>
        </div>
      </div>
      {isLoading && <div className={s['article-loading']}>Carregando...</div>}
    </MainLayout>
  );
}
