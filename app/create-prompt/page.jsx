'use client';

import Form from '@components/Form';
import { useState } from 'react';

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });

  const createPrompt = async (e) => {
    e.preventDefault(); // prevent default behavior of browser when submitting a form which is to do reload in react and xjs application -  We want the least amount of reload as possible

    setSubmitting(true);

    try {
      const response = await fetch('api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={setSubmitting}
    />
  );
};

export default CreatePrompt;
