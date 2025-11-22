import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './DynamicContent.css'
import { CopyIcon, InfoIcon, MinimizeIcon } from '../../items/Icons';
import { useApi } from '../../../context/ApiContext';
import { useEffect, useRef, useState } from 'react';
import { remToPixels } from '../../../functions/AppFunctions';

export function ContentTitle({ content }){

  return (
    <div className="py-3">
      <h1 className="font-[Poppins] font-normal text-xl text-space-900">{content.title}</h1>
    </div>
  )
}

export function ContentText({ content }){

  return (
    <div className={`markdown ${content.gap && "my-10"}`}>
      
      {content.title &&
        <h2 className="font-[Poppins] text-lg">{content.title}</h2>
      }

      <ReactMarkdown>
        {content.markdown}
      </ReactMarkdown>
    </div>
  )
}

export function ContentImage({ content }){

  const api = useApi()

  return (
    <div className={`my-10 ${content.shadow && "shadow-[0_0_6px_rgba(255,255,255,0.12)]"}`} >
      {content.title !== "" && <span className="font-[Poppins] font-normal text-base text-space-800 pb-2">{content.title}</span>}
      <div className="flex flex-row justify-center">
        <img src={api.formatMediaUrl(content.image[0].url)} />
      </div>
    </div>
  )
}

export function ContentImageText({ content }){
  
  const api = useApi()

  return (
    <div className="my-10" >
      {content.title !== "" && <span className="font-[Poppins] font-normal text-base text-space-800 pb-2">{content.title}</span>}
      <div className="flex flex-row justify-start">
        {content.image_left && 
          <>
          <div className="flex-1">
            <img src={api.formatMediaUrl(content.image[0].url)} />
          </div>
          <div className="flex-1 markdown flex flex-col justify-center">
            <ReactMarkdown>
              {content.text}
            </ReactMarkdown>
          </div>
          </>
        }
        {! content.image_left && 
          <>
          <div className="flex-1 markdown flex flex-col justify-center">
            <ReactMarkdown>
              {content.text}
            </ReactMarkdown>
          </div>
          <div className="flex-1 flex flex-row justify-center">
            <img src={api.formatMediaUrl(content.image[0].url)} />
          </div>
          </>
        }
        
      </div>
    </div>
  )
}

export function ContentCodeLines({ content }){
  
  console.log("content code lines: ", content)
  console.log("code snippits: ", parseCodeSnippets(content.code))

  const snippets = content.code ? parseCodeSnippets(content.code) : null

  function parseCodeSnippets(code) {
    const snippets = [];

    // 1. Find all blocks enclosed in curly braces { ... }
    // regex explanation:
    // \{       -> literal opening curly brace
    // ([^]*?)  -> capturing group: match any character (incl. newlines), non-greedy
    // \}       -> literal closing curly brace
    // g        -> global flag to find all matches
    const blockRegex = /\{([^]*?)\}/g;

    let blockMatch;

    // Iterate through every { block } found in the input string
    while ((blockMatch = blockRegex.exec(code)) !== null) {
      const content = blockMatch[1];

      // 2. helper function to extract content between specific delimiters
      // This handles newlines and whitespace robustly
      const extractPart = (text, startDelimiter, endDelimiter) => {
        // Escape delimiters for regex safety
        const s = startDelimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const e = endDelimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        // Regex: Start char + capture group (non-greedy) + End char
        const regex = new RegExp(`${s}([^]*?)${e}`);
        const match = text.match(regex);
        
        // Return the captured group trimmed of whitespace, or null if not found
        return match ? match[1].trim() : null;
      };

      // 3. Extract the components
      const language = extractPart(content, '"', '"');
      const codeContent = extractPart(content, '<', '>');
      const details = extractPart(content, '[', ']');
      const comment = extractPart(content, '(', ')');

      // 4. Validate Mandatory Fields
      // If language or code is missing, we skip this block (or handle error as needed)
      if (language && codeContent) {
        snippets.push({
          language: language,
          code: codeContent,
          comment: comment, // will be string or null
          details: details  // will be string or null
        });
      }
    }

    return snippets;
  }

  return (
    <div className={`flex flex-col gap-3 ${content.gap ? "my-10" : "my-3"}`}>
      {snippets.map((snip, id) => (
        <div key={id}>
          <ContentCode className="" snipit={true} content={{
            code: snip.code,
            comment: snip.comment,
            details: snip.details,
            language: snip.language,
            gap: false
          }} />
        </div>
      ))}
    </div>
  )
}

export function ContentCode({ content, snipit = false }){

  const [showInfo, setShowInfo] = useState(false)

  const lineCount = content.code.split('\n').length

  function toggleShowInfo(){
    setShowInfo(prev => !prev)
  }
  
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  return (
    <div className={`${content.gap ? "my-10" : snipit ? "my-0" : "my-4"}`}>
      <div className={`
        border-1 border-space-300 text-xl bg-space-200 rounded-xl relative
      `}>
        {content.details && showInfo && <InfoBox content={content.details} />}
        <div className={`
          ${lineCount <= 1 && ! content.title && ! content.comment ? "h-full" : "h-12"} ${content.details ? "w-22" : "w-12"}
          absolute top-0 right-0 flex flex-row justify-evenly items-center
        `}>
          {content.details && 
            <button onClick={toggleShowInfo}>
              <InfoIcon className={`
                w-7 h-7 cursor-pointer hover:text-space-800 rounded-md p-1 border-1
                ${showInfo ? "border-space-400 bg-space-300" : "border-transparent"}
              `} />
            </button>
          }
          <button className="cursor-pointer" onClick={() => {copyToClipboard(content.code)}}>
            <CopyIcon className="text-space-700 hover:text-space-800 w-5 h-5" />
          </button>
        </div>
        {content.title && (
        <>
          <span className="text-sm text-space-700 font-semibold font-[Inter] px-5 py-3 block">{content.title}</span>
          <hr className="text-space-300"></hr>
        </>
        )}
        <SyntaxHighlighter 
        language={content.language}
        style={tomorrow} 
        customStyle={{ 
          background: 'transparent',
          borderStyle: 'none',
          borderWidth: '2px',
          margin: '0px',
          padding: '0.3rem',
          paddingLeft: '1rem'
        }}
        codeTagProps={{
          style: {
            fontSize: '0.875rem',
          }
        }}>
          {content.code}
        </SyntaxHighlighter>

        {content.comment && 
          <div className="px-4 mb-3 markdown">
            <hr className="text-space-300 mt-2" /> 
            <ReactMarkdown>
              {content.comment}
            </ReactMarkdown>
          </div>
        }
      </div>
    </div>
  )
}

function InfoBox({ children, content }){

  const divRef = useRef(null)
  const [offsetHeight, setOffsetHeight] = useState(0)

  useEffect(() => {
    setOffsetHeight(divRef.current.offsetHeight + remToPixels(1))
  }, [offsetHeight])

  return(
    <div ref={divRef} 
      className={`
        absolute w-full border bg-space-200 px-3 py-1 
        border-space-300 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.6)]
        ${offsetHeight != 0 ? "visible" : "invisible"}
      `}
      style={{ transform: `translateY(-${offsetHeight}px)` }}
      >
      <div className="markdown mb-3">
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>


    </div>
  )
}

export function ContentLine(){

  return (
    <hr className="text-space-300 mt-10 mb-7" />
  )
}