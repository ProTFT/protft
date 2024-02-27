import { FormFieldProps } from "../../DialogForm/FormField";
import { BaseDialogProps } from "../Dialogs.types";
import { useEntityDialog } from "../useEntityDialog";
import { PlayerLink } from "../../../../../gql/graphql";

const PLAYER_LINK_FORM_FIELDS: FormFieldProps[] = [
  {
    label: "Link",
    name: "link",
  },
  {
    label: "Type",
    name: "type",
    type: "select",
    options: [
      { name: "Twitter", value: "twitter", key: "twitter" },
      { name: "LolChess", value: "lolchess", key: "lolchess" },
      { name: "Twitch", value: "twitch", key: "twitch" },
      { name: "Youtube", value: "youtube", key: "youtube" },
    ],
  },
];

export interface Props extends BaseDialogProps<PlayerLink> {
  playerLink?: PlayerLink;
}

export const usePlayerLinkDialog = ({
  playerLink,
  onSubmit,
  onSuccess,
}: Props) =>
  useEntityDialog({
    entity: playerLink,
    formFields: PLAYER_LINK_FORM_FIELDS,
    onSubmit,
    onSuccess,
  });
