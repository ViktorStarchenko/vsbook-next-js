'use client'

import FormBody from "../form/FormBody";
import FormGroup from "../FormGroup/FormGroup";
import FormItem from "../FormItem/FormItem";
import Input from "../Input/Input";

import Accordion from "../accordion/Accordion";
import AccordionItem from "../accordion/AccordionItem";
import AccordionTitle from "../accordion/AccordionTitle";
import AccordionContent from "../accordion/AccordionContent";
import {useActionState, useRef} from 'react'
import {postBook} from "../../lib/posts-action";
import Checkbox from "../checkbox/checkbox";
import CreateTaxonomyForm from "../CreateTaxonomyForm/CreateTaxonomyForm";
import ImagePicker from "../ImagePicker/ImagePicker";
import Textarea from "../Textarea/Textarea";
import ErrorMessageBlock from "../ErrorMessageBlock/ErrorMessageBlock";
import Modal from "../Modal/Modal";
import CreatePostSuccess from "./CreatePostSuccess";

const initialState = {
    success: false,
    errors: '',
    post: null
}

export default function CreatePostForm({genre, language, country, release, wrirer, reading_status}) {
    const [state, formAction, pending] = useActionState(postBook, initialState);
    const modalRef = useRef();

    let newPost
    if (state.success === true && state.post) {
        newPost = state.post;
        modalRef.current.open();
    }
    return (
        <div>
            <Modal ref={modalRef}>
                {newPost && (
                    <CreatePostSuccess post={newPost}/>
                )}
            </Modal>
            {pending && <h1>Penfing...</h1>}
            {newPost && <h1>Post {newPost.id} was succesfully created</h1>}
            <FormBody action={formAction}>
                <FormGroup>
                    <FormItem>
                        <Input
                            className={`${state.errors?.content ? 'input-error' : ''}`}
                            type="text"
                            name="title"
                            placeholder="Book's title"
                            validation={[
                                { type: "required", message: "The Title must not be empty" },
                                { type: "minLength", value: 2, message: "Title must be at least 2 characters" }
                            ]}
                            errorMessage={state.errors?.title}/>
                    </FormItem>
                    
                    <FormItem>
                        <select name="status">
                            <option id="draft" value="draft">Draft</option>
                            <option id="value" value="publish">Publish</option>
                        </select>
                    </FormItem>

                    <FormItem>
                        <ImagePicker name="featured_image" id="featured_image"/>
                        <ErrorMessageBlock message={state.errors?.featured_media}/>
                    </FormItem>
                </FormGroup>

                {/*<FormGroup>*/}
                {/*    <FormItem>*/}
                {/*        <textarea className={`${state.errors?.content ? 'input-error' : ''}`} name="content" id="content" cols="30" rows="10" placeholder="Book's content">*/}
                {/*        </textarea>*/}
                {/*        {state.errors?.content && <p className="error-message">{state.errors.content}</p>}*/}
                {/*    </FormItem>*/}
                {/*</FormGroup>*/}

                <FormGroup>
                    <FormItem>
                        <Textarea
                            className={`${state.errors?.content ? 'input-error' : ''}`}
                            name="content"
                            id="content"
                            placeholder="Book's content"
                            validation={[
                                { type: "required", message: "The Content must not be empty" },
                                { type: "minLength", value: 3, message: "Content must be at least 3 characters" }
                            ]}
                            errorMessage={state.errors?.title}
                        />
                    </FormItem>
                </FormGroup>

                {genre && (
                    <FormGroup>
                        <FormItem>
                            <Accordion>
                                <AccordionItem id="genre">
                                    <AccordionTitle className="title btn">Genre</AccordionTitle>
                                    <AccordionContent contentAbsolute={true}>
                                        {genre.map(item => (
                                            <Checkbox key={`genre-${item.id}`} id={item.id} name="genre" label={item.name} value={item.id}/>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </FormItem>
                        <FormItem>
                            <CreateTaxonomyForm taxonomy="genre"/>
                        </FormItem>
                    </FormGroup>
                )}

                {language && (
                    <FormGroup>
                        <FormItem>
                            <Accordion>
                                <AccordionItem id="language">
                                    <AccordionTitle className="title btn">language</AccordionTitle>
                                    <AccordionContent contentAbsolute={true}>
                                        {language.map(item => (
                                            <Checkbox key={`language-${item.id}`} id={item.id} name="language" label={item.name} value={item.id}/>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </FormItem>
                        <FormItem>
                            <CreateTaxonomyForm taxonomy="language"/>
                        </FormItem>
                    </FormGroup>
                )}

                {country && (
                    <FormGroup>
                        <FormItem>
                            <Accordion>
                                <AccordionItem id="country">
                                    <AccordionTitle className="title btn">country</AccordionTitle>
                                    <AccordionContent contentAbsolute={true}>
                                        {country.map(item => (
                                            <Checkbox key={`country-${item.id}`} id={item.id} name="country" label={item.name} value={item.id}/>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </FormItem>
                        <FormItem>
                            <CreateTaxonomyForm taxonomy="country"/>
                        </FormItem>
                    </FormGroup>
                )}

                {release && (
                    <FormGroup>
                        <FormItem>
                            <Accordion>
                                <AccordionItem id="release">
                                    <AccordionTitle className="title btn">release</AccordionTitle>
                                    <AccordionContent contentAbsolute={true}>
                                        {release.map(item => (
                                            <Checkbox key={`release-${item.id}`} id={item.id} name="release" label={item.name} value={item.id}/>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </FormItem>
                        <FormItem>
                            <CreateTaxonomyForm taxonomy="release"/>
                        </FormItem>
                    </FormGroup>
                )}

                {wrirer && (
                    <FormGroup>
                        <FormItem>
                            <Accordion>
                                <AccordionItem id="wrirer">
                                    <AccordionTitle className="title btn">wrirer</AccordionTitle>
                                    <AccordionContent contentAbsolute={true}>
                                        {wrirer.map(item => (
                                            <Checkbox key={`wrirer-${item.id}`} id={item.id} name="wrirer" label={item.name} value={item.id}/>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </FormItem>
                        <FormItem>
                            <CreateTaxonomyForm taxonomy="wrirer"/>
                        </FormItem>
                    </FormGroup>
                )}

                {reading_status && (
                    <FormGroup>
                        <FormItem>
                            <Accordion>
                                <AccordionItem id="reading_status">
                                    <AccordionTitle className="title btn">Reading Status</AccordionTitle>
                                    <AccordionContent contentAbsolute={true}>
                                        {reading_status.map(item => (
                                            <Checkbox key={`reading_status-${item.id}`} id={item.id} name="reading_status" label={item.name} value={item.id}/>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </FormItem>
                        <FormItem>
                            <CreateTaxonomyForm taxonomy="reading_status"/>
                        </FormItem>
                    </FormGroup>
                )}

            </FormBody>
        </div>
    )
}