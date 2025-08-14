// components/MovieChatWidget.js
'use client'

import { useState, useEffect } from 'react';
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import useGetPineconeEmbeddings from "../../hooks/useGetPineconeEmbeddings";
import FormGroup from "../FormGroup/FormGroup";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import {useGetPostsByIds} from "../../hooks/useGetPostsByIds";
import BooksChatWidgetSmallItem from "./BooksChatWidgetSmallItem";
import {generateId, getFormattedDateTime} from "../../lib/client-helpers";
import {helperChatActions} from "../../store/helper-chat-slice";
import BooksChatWidgetSmallList from "./BooksChatWidgetSmallList";

export default function BooksChatWidgetSmall() {
    const [queryText, setQueryText] = useState('');
    const [response, setResponse] = useState(null);
    const [updatedQueryText, setUpdatedQueryText] = useState(null);
    const [assistentResponse, setAssistentResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [newResponseItem, setNewResponseItem] = useState(null);
    const [hasQueried, setHasQueried] = useState(false);

    const currentIndex = useSelector(state => state.pineconeIndexes.currentIndex);
    const helperChatItems = useSelector(state => state.helperChat.items);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null);

        const response = await fetch('/api/agent/groq/generate-query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userMessage: queryText }),
        });

        const data = await response.json();
        // console.log(data.answer);
        // console.log("queryText", queryText);
        setUpdatedQueryText(data.answer);
        setLoading(false);
    };


    const { data: embeddingResult = {}, isLoading: isEmbeddingLoading } = useGetPineconeEmbeddings({
        indexName: currentIndex.name,
        indexHost: currentIndex.host,
        namespace: "example-namespace",
        queryText: updatedQueryText
    });

    useEffect( () =>  {
        if (embeddingResult?.matches) {
            console.log('embeddingResult.matches', embeddingResult.matches)
            async function fetchData() {
                setLoading(true);
                const response = await fetch('/api/agent/groq/generate-response', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ embeddingResult: embeddingResult.matches, userMessage: queryText }),
                });
                const data = await response.json();
                setAssistentResponse(data?.books || '')
                setHasQueried(true);
                console.log('FULL ANSWER', assistentResponse);
                setLoading(false);
            }
            fetchData();
        }
    }, [embeddingResult]);



    const matches = embeddingResult.matches || [];
    const embeddingIds = matches.map(item => item.id);
    const { data: postsData, isLoading: isPostsLoading } = useGetPostsByIds({page: 1, perPage: 10, sortOrder: "desc", filtersArray: null, idsArray: embeddingIds, enabled: embeddingIds.length > 0})

    console.log("hasQueried", hasQueried)
    useEffect(() => {
        if (hasQueried) {
            const id = generateId();
            const currentDateTime = getFormattedDateTime();
            const newHelperChatItem = {
                id: id,
                dateTime: currentDateTime,
                userRequest: queryText,
                items: [],
                emptyResponse: ''
            }
            if (postsData?.posts?.length > 0 && assistentResponse?.length > 0) {
                const combinedData = assistentResponse
                    .map(item => {
                        const matchingPost = postsData.posts.find(post => post.id === item.id);
                        if (!matchingPost) return null;
                        return {
                            id: `${id}-${item.id}`,
                            assistantResponse: item,
                            post: matchingPost
                        };
                    })
                    .filter(Boolean); // remove null/undefined
                if (!combinedData) {
                    return null;
                }
                newHelperChatItem.items = combinedData;
            } else {
                newHelperChatItem.emptyResponse = 'The assistant did not find any matches for your request. Please try again later or try a different request.'
            }
            if (!newHelperChatItem) {
                return null;
            }
            setNewResponseItem(newHelperChatItem);
        }
    }, [assistentResponse, hasQueried]);


    useEffect(() => {
        if (!newResponseItem) return;
        dispatch(helperChatActions.addItem(newResponseItem));
    }, [newResponseItem]);
    console.log('helperChatItems', helperChatItems);

    return (
        <div className="helper-chat-wrapper">
            {!chatOpen && (
                <div className="helper-chat-button">
                    <div className="helper-chat-icon" onClick={() => setChatOpen(prevState => !prevState)}>
                        <svg width="800px" height="800px" viewBox="-1 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="Vivid.JS" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g id="Vivid-Icons" transform="translate(-668.000000, -409.000000)">
                                    <g id="Icons" transform="translate(37.000000, 169.000000)">
                                        <g id="chat" transform="translate(624.000000, 234.000000)">
                                            <g transform="translate(7.000000, 6.000000)" id="Shape">
                                                <path d="M17,31.765 C13.4557046,31.857522 9.95909276,30.9327036 6.924,29.1 L0,36 L0,15.882 L0.012,15.888 C0.011,15.791 0,15.7 0,15.6 C0,6.369 6.247,0 17,0 C27.753,0 34,6.652 34,15.882 C34,25.112 27.753,31.765 17,31.765 Z" fill="#fe7900">

                                                </path>
                                                <path d="M24.994,12.99 C26.6508542,12.99 27.994,14.3331458 27.994,15.99 C27.994,17.6468542 26.6508542,18.99 24.994,18.99 C23.3371458,18.99 21.994,17.6468542 21.994,15.99 C21.994,14.3331458 23.3371458,12.99 24.994,12.99 Z M17,13 C18.6568542,13 20,14.3431458 20,16 C20,17.6568542 18.6568542,19 17,19 C15.3431458,19 14,17.6568542 14,16 C14,14.3431458 15.3431458,13 17,13 Z M9,13 C10.6568542,13 12,14.3431458 12,16 C12,17.6568542 10.6568542,19 9,19 C7.34314575,19 6,17.6568542 6,16 C6,14.3431458 7.34314575,13 9,13 Z" fill="#202020">

                                                </path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
            )}

            {chatOpen && (
                <div className="helper-chat-body fixed bottom-4 right-4 bg-white border p-4 shadow-md rounded-xl w-80 z-50">
                    <div className="helper-chat-close" onClick={() => setChatOpen(prevState => !prevState)}>
                        ✖
                    </div>
                    <div className="helper-chat-header">
                        <h4 className="font-bold mb-2">🎬 Ask AI for a Book</h4>
                        {response?.error && (
                            <div className="mt-3 text-red-500 text-sm">
                                {response.error}
                            </div>
                        )}
                    </div>
                    <div className="helper-chat-result">
                        {helperChatItems?.length > 0 && helperChatItems.map(item => (
                            <BooksChatWidgetSmallList key={item.id} item={item} />
                        ))}
                        {loading && <LoadingIndicator />}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <FormGroup className="d-flex">
                            <input
                                type="text"
                                placeholder="e.g. dark sci-fi thriller"
                                className="w-full border px-2 py-1 mb-2"
                                value={queryText}
                                onChange={(e) => setQueryText(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="helper-chat-submit w-full bg-black text-white py-1 rounded"
                                disabled={loading}
                            >
                                {loading ? <LoadingIndicator /> : (
                                    <svg width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
                                         className="SendButton__SendIcon-sc15mx-1 gyIZJc">
                                        <path fillRule="evenodd" fill="#fe7900" clipRule="evenodd"
                                              d="M11.368 18.983l-3.217-7.245c-.038-.083-.06-.173-.06-.263-.015-.217.037-.667.39-1.012l2.505-2.498c.292-.292.765-.292 1.057 0 .293.293.293.765 0 1.058l-2.28 2.28 2.663 6.427 5.7-15.847L2.211 7.448l4.027 1.335c.39.127.608.555.473.945-.128.39-.555.607-.945.472l-4.68-1.552s-.045-.015-.068-.03c-.232-.105-.435-.278-.57-.495-.135-.218-.202-.473-.195-.728.008-.255.098-.502.248-.712.15-.21.36-.36.607-.45L18.044.323c.224-.083.472-.09.704-.038.233.053.45.173.623.345.173.173.293.383.345.623.052.232.037.48-.038.705l-5.925 16.935c-.082.24-.24.457-.45.607-.21.15-.457.24-.712.248-.255.007-.51-.06-.727-.195-.218-.135-.39-.338-.496-.57z"></path>
                                    </svg>
                                )}

                            </button>
                        </FormGroup>
                    </form>

                    {response?.explanation && (
                        <div className="mt-3 text-sm">
                            <p className="mb-2">{response.explanation}</p>
                            <ul className="list-disc ml-5">
                                {postsData && postsData.posts?.map(post => (
                                    <li key={post.id}>
                                        <Link href={`/books/${post.slug}`} dangerouslySetInnerHTML={{ __html: post.title.rendered }}></Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}
