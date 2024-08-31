---
title: "Typeform Webhook TS Types"
description: "TypeScript types for Typeform webhook data."
date: "2024-08-31"
author: "David Pescariu"
tags: ["typescript", "typeform", "webhook", "types"]
---

## Why?

As far as I could tell, Typeform doesn't provide TypeScript types for their
webhook data (or I wasn't able to find them, anyway).

This provides a pretty solid foundation for working with Typeform webhook data,
and it includes descriptions of the fields (as taken from the docs).

## How accurate is this?

Pretty accurate - I realized I needed a proper TypeScript definition for the
webhook event after dealing with some weird bugs at work, so I tried to be as
accurate as possible.

As of Aug. 2024, this contains all available fields, but you can check the
`SupportedFieldType` type to see if there are any missing types - feel free to
leave a comment on [the gist](https://gist.github.com/davidp-ro/5f917f12b2a9d930ad680ad92351fad8)
if you find any missing types!

## TypeScript Definition:

```ts
/**
 * Typeform API Types since no official ones are provided for webhook data
 *
 * ---
 *
 * #### Relevant resources to view info about the API and Models:
 *
 * @see https://www.typeform.com/developers
 * @see https://www.typeform.com/developers/webhooks/example-payload/
 * @see https://www.typeform.com/developers/create/reference/create-form/
 * @see https://www.typeform.com/developers/responses/JSON-response-explanation/
 */
export namespace Typeform {
  /**
   * Data received from a Typeform webhook.
   *
   * @see https://www.typeform.com/developers/webhooks/example-payload/
   */
  export interface WebhookEvent {
    /** Unique ID for the webhook. Automatically assigned by Typeform. */
    event_id: string;

    /** Reason the webhook is being sent. We care about `form_response`. */
    event_type: string;

    /**
     * Object that contains information about the typeform and account
     * associated with the webhook.
     *
     * @see FormResponse
     */
    form_response: FormResponse;
  }

  /**
   * Object that contains information about the typeform and account associated
   * with the webhook.
   *
   * If someone opens the typeform but doesn't complete it, the payload will
   * include an object that lists all the general data, with a `null` value
   * for the answers array and no Hidden Fields or calculated score values!
   */
  export interface FormResponse {
    /**
     * Unique ID for the typeform. Find in the form URL. For example, in the
     * URL `https://mysite.typeform.com/to/u6nXL7`, the `form_id` is `u6nXL7`.
     */
    form_id: string;

    /**
     * Unique ID for the typeform submission. This is identical to `response_id`
     * in the Responses API.
     */
    token: string;

    /** Date and time the typeform responses were submitted, ISO Timestamp. */
    submitted_at: string;

    /** Date and time of form landing, ISO Timestamp. */
    landed_at: string;

    /**
     * If the typeform includes a score calculation, the webhook response will
     * contain this object.
     */
    calculated?: {
      /** Resulting score */
      score: number;
    };

    /**
     * If the typeform has variables, this array contains all the variables of
     * the typeform and their values.
     *
     * @see Variable
     */
    variables: Variable[];

    /**
     * If the typeform has hidden fields, the webhook response will contain an
     * object with the value of each hidden field.
     */
    hidden: {
      [key: string]: string;
    };

    /**
     * Object that lists the questions in the typeform. You can use the
     * definition to match questions with answers and ending reference with
     * ending screens.
     *
     * @see FormDefinition
     */
    definition: FormDefinition;

    /**
     * An array of objects that lists the answers for the questions in the
     * typeform.
     *
     * If someone opens the typeform but doesn't complete it, the payload will
     * include an object that lists all the general data, with a `null` value
     * for the answers array and no Hidden Fields or calculated score values!
     *
     * @see Answer
     */
    answers: Answer[];

    /**
     * Typeform(s) finish with an Ending Screen, which appears after respondents
     * click submit.
     *
     * A typeform can have multiple endings according to the form's logic.
     * The webhook displays information under the `ending` field ending which
     * contains the ID and the reference.
     *
     * You can match the entire ending using form definition.
     */
    ending?: Ending;
  }

  /** Used variable */
  export interface Variable {
    /** Unique identifier for the variable. */
    key: string;
    /** Type of the variable, could either be `text` or `number`. */
    type: string;
    /** If `type == number`, contains the numerical value of the variable. */
    number?: number;
    /** If `type == text`, contains the text value of the variable. */
    text?: string;
  }

  /**
   * Object that lists the questions in the typeform. You can use the
   * definition to match questions with answers and ending reference with ending
   * screens.
   */
  export interface FormDefinition {
    /**
     * Unique ID for the typeform. Find in the form URL. For example, in the
     * URL `https://mysite.typeform.com/to/u6nXL7`, the `form_id` is `u6nXL7`.
     */
    id: string;

    /** Title of the typeform. */
    title: string;

    /**
     * Questions in the typeform. Order of the fields in this questions array
     * matches the order of fields in the answers array (which is included later
     * in the payload).
     *
     * @see Field for the structure of each question.
     *
     * @see FormResponse.answers for the answers array.
     * @see Answer for the structure of each answer.
     */
    fields: Field[];

    /**
     * Form endings. The correct one can be matched using the values of the
     * `FormResponse.ending` field.
     */
    endings: Ending[];
  }

  /**
   * Object that lists the questions in the typeform. You can use the
   * definition to match questions with answers and ending reference with ending
   * screens.
   *
   * @see FormDefinition.fields for the list of fields.
   *
   * @see FormResponse.answers for the answers array.
   * @see Answer for the structure of each answer.
   */
  export interface Field {
    /**
     * Unique ID for the field. You can use the field id to match questions with
     * answers.
     */
    id: string;

    /** Title of the question associated with the field. */
    title: string;

    /**
     * Question type.
     *
     * @remark If value is not in `SupportedFieldType`, then we may not support
     * the answer value. Please check the `Answer` type before adding new values
     * in `SupportedFieldType`.
     */
    type: SupportedFieldType | {};

    /**
     * A name you can use to reference the field.
     *
     * When you create a form with the Create API, you can specify a readable ref
     * for each field. If you don't specify a ref or you create the form through
     * the Typeform admin panel, our system will generate a non-persistent ref
     * for each field.
     *
     * The system-generated ref will look something like `0e1178a0-67f0-4779-...`
     * and _**will be different in every payload**_.
     *
     * It must be less than 255 characters and in valid regular expression for
     * `^[a-zA-Z0-9_-]+$`.
     */
    ref?: string;

    /**
     * `true` if respondents can select more than one answer choice. `false` if
     * respondents can select only one answer choice or the question is not a
     * `multiple_choice` or `picture_choice` question type.
     */
    allow_multiple_selections: boolean;

    /**
     * `true` if the question includes an "Other" option so respondents can enter
     * a different answer choice from those listed. `false` if the question
     * limits answer choices to those listed or the question is not a `multiple_choice`
     * or `picture_choice` question type.
     */
    allow_other_choice: boolean;

    /**
     * If the question type is `multiple_choice`, `picture_choice`, or `dropdown`,
     * contains a list of available choices for this field.
     */
    choices?: Choice[];

    /** Used for fields like `calendly` that have properties. */
    properties?: Record<string, any>;
  }

  /**
   * Represents a choice in a `multiple_choice`, `picture_choice`, or `dropdown`
   */
  export interface Choice {
    /** Unique ID for the choice */
    id: string;
    /**
     * Auto-generated identifier for the choice that can be changed
     * programmatically.
     */
    ref?: string;
    /** Label for the choice */
    label: string;
  }

  /**
   * Answer to a question in a typeform.
   *
   * @remarks
   * - this type will only expose the correct fields based on the `.type` field.
   *
   * - if you need to know the type of the parent question see `.field.type`.
   *
   * - it's **really important** to understand that `.type` and `.field.type`
   * represent very different things:
   *   - `.type` represents the type of the answer, and can be used to extract
   *   the value from the submission's answer.
   *   - `.field.type` represents the type of the parent question, and can be
   *   used to match the question type to answer type, or show the question type
   *   in the UI, etc - NOT for matching to answer type!
   *
   * @see FormDefinition.fields for the list of fields.
   *
   * @see FormResponse.answers for the answers array.
   */
  export type Answer =
    | TextAnswer
    | EmailAnswer
    | PhoneNumberAnswer
    | DateAnswer
    | NumberAnswer
    | BooleanAnswer
    | ChoicesAnswer
    | ChoiceAnswer
    | UrlAnswer
    | PaymentAnswer
    | FileUrlAnswer;

  /**
   * Question type or the value of `[Answer].field.type`.
   *
   * @remark If value is not in `SupportedFieldType`, then we may not support
   * the answer value. Please check the `Answer` type before adding new values
   * in `SupportedFieldType`.
   */
  export type SupportedFieldType =
    | "short_text"
    | "long_text"
    | "dropdown"
    | "multiple_choice"
    | "picture_choice"
    | "ranking"
    | "email"
    | "date"
    | "legal"
    | "yes_no"
    | "website"
    | "calendly"
    | "rating"
    | "opinion_scale"
    | "number"
    | "file_upload"
    | "payment";

  export interface AnswerField {
    /**
     * Unique ID for the field. You can use the field id to match questions with
     * answers.
     */
    id: string;

    /**
     * Type of the parent question.
     *
     * @remark If value is not in `SupportedFieldType`, then we may not support
     * the answer value. Please check the `Answer` type before adding new values
     * in `SupportedFieldType`.
     */
    type: SupportedFieldType;

    /* A name you can use to reference the field. */
    ref?: string;
  }

  /** Base interface for all answer types to extend. */
  interface BaseAnswer {
    /**
     * Object that contains identifying information to help you match the answer
     * with the question.
     */
    field: AnswerField;
  }

  /**
   * Matching `field.type`:
   * - `short_text`
   * - `long_text`
   *
   * @see {@link Answer|Answer} Full Type definition & more details.
   */
  export interface TextAnswer extends BaseAnswer {
    type: "text";
    text: string;
  }

  /**
   * Matching `field.type`:
   * - `email`
   *
   * @see {@link Answer|Answer} Full Type definition & more details.
   */
  export interface EmailAnswer extends BaseAnswer {
    type: "email";
    email: string;
  }

  /**
   * Matching `field.type`:
   * - `phone_number`
   *
   * @see {@link Answer|Answer} Full Type definition & more details.
   */
  export interface PhoneNumberAnswer extends BaseAnswer {
    type: "phone_number";
    phone_number: string;
  }

  /**
   * Matching `field.type`:
   * - `date`
   *
   * @see {@link Answer|Answer} Full Type definition & more details.
   */
  export interface DateAnswer extends BaseAnswer {
    type: "date";
    /** Format is always `YYYY-MM-DD`. */
    date: string;
  }

  /**
   * Matching `field.type`:
   * - `number`
   * - `rating`
   * - `opinion_scale`
   * - `nps`
   *
   * @see {@link Answer|Answer} Full Type definition & more details.
   */
  export interface NumberAnswer extends BaseAnswer {
    type: "number";
    number: number;
  }

  /**
   * Matching `field.type`:
   * - `yes_no`
   * - `legal`
   *
   * @see {@link Answer|Answer} Full Type definition & more details.
   */
  export interface BooleanAnswer extends BaseAnswer {
    type: "boolean";
    boolean: boolean;
  }

  /**
   * Matching `field.type`:
   * - `dropdown`
   * - `multiple_choice`
   * - `picture_choice`
   *
   * When the "multiple selections" option is activated.
   *
   * @see {@link Answer|Answer} Full Type definition & more details.
   */
  export interface ChoicesAnswer extends BaseAnswer {
    type: "choices";

    /**
     * For multiple-selection choice fields, if respondents use the "Other" option
     * to enter their own answers, the choices object will contain both `ids`,
     * `labels`, `refs` of the selected choices and `other`.
     *
     * If respondents do not use the "Other" option or the "other" option is
     * disabled (the typeform does not allow respondents to enter their own answers),
     * choices will contain `ids`, `labels` and `refs`.
     */
    choices: {
      ids: string[];
      labels: string[];
      refs: string[];
      other?: string;
    };
  }

  /**
   * Matching `field.type`:
   * - `dropdown`
   * - `multiple_choice`
   * - `picture_choice`
   *
   * @see {@link Answer|Answer} Full Type definition & more details.
   */
  export interface ChoiceAnswer extends BaseAnswer {
    type: "choice";

    /**
     * For single-selection choice fields, the choice object contains either the
     * selected choice properties (`id`, `label` and `ref`) or `other`.
     *
     * If the "Other" option is disabled (the typeform does not allow respondents
     * to enter their own answers), choice will contain id, label and ref.
     */
    choice: {
      id?: string;
      label?: string;
      ref?: string;
      other?: string;
    };
  }

  /**
   * Matching `field.type`:
   * - `website`
   * - `calendly`
   *
   * @see {@link Answer|Answer} Full Type definition & more details.
   */
  export interface UrlAnswer extends BaseAnswer {
    type: "url";
    url: string;
  }

  /**
   * Matching `field.type`:
   * - `payment`
   *
   * @see {@link Answer|Answer} Full Type definition & more details.
   */
  export interface PaymentAnswer extends BaseAnswer {
    type: "payment";
    payment: {
      /**
       * Amount of the payment. In the currency selected when the typeform was
       * initially created.
       */
      amount: number;
      /** Last four digits of the credit card used to make the payment. */
      last4: string;
      /** Name on the credit card used to make the payment. */
      name: string;
      /** Whether the payment was processed successfully. */
      success: boolean;
    };
  }

  /**
   * Matching `field.type`:
   * - `file_upload`
   *
   * @see {@link Answer|Answer} Full Type definition & more details.
   */
  export interface FileUrlAnswer extends BaseAnswer {
    type: "file_url";

    /**
     * Note: Do not rely on file_url having a certain structure or shape - it is
     * subject to change. To access file information for a file obtained using
     * file_url from a webhook payload, you can rely on the Content-Disposition
     * header.
     *
     * It is not currently possible to reliably access file information for a
     * file obtained using a file_url from a Results API payload.
     */
    file_url: string;
  }

  /**
   * An ending screen in a Typeform. Can be matched using the `FormDefinition`.
   */
  export interface Ending {
    id: string;
    ref: string;
    title?: string;
    type?: string;
    properties?: {
      button_text?: string;
      show_button?: boolean;
      share_icons?: boolean;
      button_mode?: string;
    };
  }
}
```
