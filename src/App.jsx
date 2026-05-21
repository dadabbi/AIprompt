import { useEffect, useState } from 'react'

function App() {
  const [prompts, setPrompts] = useState([])
  const [search, setSearch] = useState('')

  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    const savedPrompts =
      localStorage.getItem('prompts')

    if (savedPrompts) {
      setPrompts(JSON.parse(savedPrompts))
    }
  }, [])

  useEffect(() => {
    if (prompts.length > 0) {
      localStorage.setItem(
        'prompts',
        JSON.stringify(prompts)
      )
    }
  }, [prompts])

  const filteredPrompts = prompts.filter((prompt) =>
    prompt.title
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const copyPrompt = (text) => {
    navigator.clipboard.writeText(text)
    alert('복사 완료')
  }

  const deletePrompt = (id) => {
    const updatedPrompts = prompts.filter(
      (prompt) => prompt.id !== id
    )

    setPrompts(updatedPrompts)
  }

  const addPrompt = () => {
    if (!title || !content) {
      alert('제목과 내용을 입력하세요')
      return
    }

    const newPrompt = {
      id: Date.now(),
      title,
      tags: tags
        .split(',')
        .map((tag) => tag.trim()),
      content,
    }

    setPrompts([newPrompt, ...prompts])

    setTitle('')
    setTags('')
    setContent('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-black text-white px-6 py-10">

      <div className="max-w-5xl mx-auto">

        <div className="mb-12">
          <h1 className="text-6xl font-black tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            PromptVault
          </h1>

          <p className="text-zinc-400 mt-4 text-lg">
            AI 프롬프트를 저장하고 관리하세요
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl mb-10">

          <h2 className="text-2xl font-bold mb-6">
            새 프롬프트 추가
          </h2>

          <div className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md outline-none focus:ring-2 focus:ring-white transition"
            />

            <input
              type="text"
              placeholder="태그 입력 (쉼표로 구분)"
              value={tags}
              onChange={(e) =>
                setTags(e.target.value)
              }
              className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md outline-none focus:ring-2 focus:ring-white transition"
            />

            <textarea
              placeholder="프롬프트 입력"
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
              className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md outline-none focus:ring-2 focus:ring-white h-40 resize-none transition"
            />

            <button
              onClick={addPrompt}
              className="bg-white text-black py-4 rounded-2xl font-bold hover:scale-[1.01] hover:opacity-90 transition"
            >
              프롬프트 추가
            </button>

          </div>
        </div>

        <input
          type="text"
          placeholder="프롬프트 검색..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full p-5 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-md outline-none focus:ring-2 focus:ring-white mb-10 transition"
        />

        {filteredPrompts.length === 0 && (
          <div className="text-center text-zinc-500 mt-24 text-xl">
            저장된 프롬프트가 없습니다
          </div>
        )}

        <div className="flex flex-col gap-6">

          {filteredPrompts.map((prompt) => (

            <div
              key={prompt.id}
              className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl w-full shadow-2xl hover:scale-[1.01] hover:bg-white/[0.13] transition duration-300"
            >

              <h2 className="text-3xl font-bold mb-5">
                {prompt.title}
              </h2>

              <div className="flex gap-2 mb-5 flex-wrap">

                {prompt.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/80 px-4 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}

              </div>

              <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap text-[15px]">
                {prompt.content}
              </p>

              <div className="flex flex-wrap gap-3 mt-8">

                <button
                  onClick={() =>
                    copyPrompt(
                      `${prompt.tags.join(
                        ', '
                      )}, ${prompt.content}`
                    )
                  }
                  className="bg-white text-black px-5 py-3 rounded-2xl font-semibold hover:scale-105 hover:opacity-80 transition"
                >
                  전체 복사
                </button>

                <button
                  onClick={() =>
                    copyPrompt(
                      prompt.tags.join(', ')
                    )
                  }
                  className="bg-blue-500 px-5 py-3 rounded-2xl font-semibold hover:scale-105 hover:opacity-80 transition"
                >
                  태그 복사
                </button>

                <button
                  onClick={() =>
                    copyPrompt(prompt.content)
                  }
                  className="bg-zinc-700 px-5 py-3 rounded-2xl font-semibold hover:scale-105 hover:opacity-80 transition"
                >
                  본문 복사
                </button>

                <button
                  onClick={() =>
                    deletePrompt(prompt.id)
                  }
                  className="bg-red-500 px-5 py-3 rounded-2xl font-semibold hover:scale-105 hover:opacity-80 transition"
                >
                  삭제
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  )
}

export default App