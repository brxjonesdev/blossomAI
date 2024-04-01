'use client';
import React from 'react';
import { useState } from 'react';

export default function ContentSelect({
  contentType,
}: {
  contentType: string;
}) {
  const [contentTypes, setContentTypes] = useState<string>(contentType);
  function changeThibng() {
    setContentTypes('new thing');
  }
  return (
    <>
      <div>ContentSelect</div>
      <button onClick={changeThibng}>Change</button>
    </>
  );
}
