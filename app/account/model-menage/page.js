'use client';

import Section from "../../../components/section/Section";
import FormGroup from "../../../components/FormGroup/FormGroup";

import {useDispatch, useSelector} from "react-redux";
import {pineconeIndexesActions} from "../../../store/pinecone-indexes";

export default function ModelMenage() {

    const dispatch = useDispatch();
    const storedIndexes = useSelector(state => state.pineconeIndexes.indexes) || [];
    const currentIndex = useSelector(state => state.pineconeIndexes.currentIndex) || {}

    function handleIndexChange(e) {
        const selectedValue = e.target.value;
        const selectedIdex = storedIndexes.find(item => item.name === selectedValue);

        if (!selectedIdex) {
            console.warn(`⚠️ Index not found for value: "${selectedValue}"`);
            return;
        }

        dispatch(pineconeIndexesActions.setCurrentIndex(selectedIdex))
    }

    return (
        <Section>
            <div className="post-content">
                <div>
                    <h2 className="h3">Menage Pinecone Index.</h2>
                    <FormGroup>
                        <select name="index" onChange={handleIndexChange}>
                            <option
                                value=""
                            >Choose</option>
                            {storedIndexes && storedIndexes.map(item => (
                                <option
                                    selected={currentIndex?.name === item.name}
                                    key={item.name}
                                    value={item.name}
                                    host={item.host}
                                    item={item}
                                >{item.name}</option>
                            ))}
                        </select>
                    </FormGroup>
                </div>
            </div>
        </Section>
    );
}