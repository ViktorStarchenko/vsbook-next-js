'use client';
import {useRef, useState} from 'react';
import {useMutation, useQuery} from "@tanstack/react-query";
import FormGroup from "../../../components/FormGroup/FormGroup";
import FormItem from "../../../components/FormItem/FormItem";
import CreatePostSuccess from "../../../components/CreatePostForm/CreatePostSuccess";
import Modal from "../../../components/Modal/Modal";
import LoadingIndicator from "../../../components/loadingIndicator/LoadingIndicator";

export default function UpsertPinecone() {
    const [response, setResponse] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const indexRef = useRef();
    const fileRef = useRef();
    const modelRef = useRef();
    const modalRef = useRef()

    const { data: listIndexes = {}, isLoading: isListIndexesLoading } = useQuery({
        queryKey: ['listIndexes'],
        queryFn: async () => {
            const response = await fetch(`/api/pinecone/list-indexes`);
            return response.json();
        }
    });

    const upsertVectors = async () => {
        setIsLoading(true);
        const formData = new FormData();
        const file = fileRef.current.files[0];
        const index = indexRef.current.value;
        const host = indexRef.current.selectedOptions[0].getAttribute("host");
        const model = modelRef.current.value;

        formData.append("file", file);
        formData.append("index", index);
        formData.append("host", host);
        formData.append("model", model);

        const res = await fetch('/api/pinecone/upsert', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        setResponse(data)
        console.log("UPSERT DATA", data);
        setIsLoading(false)
    };

    if (response.success === true) {
        modalRef.current.open();
    }

    console.log("listIndexes", listIndexes.indexes)
    console.log("response", response)
    return (
        <div>
            <h1>Upsert Pinecone</h1>
            <Modal ref={modalRef}>
                {response.success && (
                    <div><h2 className="h2">Successfully upserted {response.count} items</h2></div>
                )}
            </Modal>
            <div>
                <FormGroup>
                    {listIndexes?.indexes?.length > 0 && (
                        <FormItem>
                            <select name="index" ref={indexRef}>
                                {listIndexes?.indexes?.map(item => (
                                    <option
                                        key={item.name}
                                        value={item.name}
                                        host={item.host}
                                    >{item.name}</option>
                                ))}
                            </select>
                        </FormItem>
                    )}
                </FormGroup>
                <FormGroup>
                    <FormItem>
                        <select name="model" ref={modelRef}>
                            <option
                                value="text-embedding-3-small"
                            >text-embedding-3-small</option>
                            <option
                                value="text-embedding-3-large"
                            >text-embedding-3-large</option>
                        </select>
                    </FormItem>
                </FormGroup>
                <FormGroup>
                    <FormItem>
                        <input type="file" ref={fileRef}/>
                    </FormItem>
                </FormGroup>
                <FormGroup>
                    <FormItem>
                        {!isLoading && (
                            <div className="btn" onClick={upsertVectors}>Submit</div>
                        )}
                        {isLoading && <LoadingIndicator />}
                    </FormItem>
                </FormGroup>
            </div>
        </div>
    )
}