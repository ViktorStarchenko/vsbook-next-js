'use client';

import {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import useGetPineconeIndexes from "../../hooks/useGetPineconeIndexes";
import {pineconeIndexesActions} from "../../store/pinecone-indexes";
import {fetchCurrentIndex, sendCurrentIndex} from "../../store/pinecone-indexes-action";

let isInitial = true;

export default function ClientProviderPinecone() {

    const isCurrentIndexChanged = useSelector(state => state.pineconeIndexes.isCurrentIndexChanged) || false;
    const currentIndex = useSelector(state => state.pineconeIndexes.currentIndex) || {};
    const initiallyLoaded = useSelector(state => state.pineconeIndexes.initiallyLoaded) || false;
    const dispatch = useDispatch();

    const {data, isLoading} = useGetPineconeIndexes();

    useEffect(() => {
        if (data && data.indexes) {
            dispatch(pineconeIndexesActions.getIndexes(data.indexes))
        }
    }, [data])

    useEffect(() => {
        dispatch(fetchCurrentIndex());
    }, [dispatch])

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }

        if (isCurrentIndexChanged) {
            dispatch(sendCurrentIndex(currentIndex));
            sendCurrentIndex()
        }

        if (initiallyLoaded == false) {
            dispatch(pineconeIndexesActions.updateInitiallyLoaded(true))
        }

    }, [currentIndex, isCurrentIndexChanged]);

    return (
        <></>
    )
}