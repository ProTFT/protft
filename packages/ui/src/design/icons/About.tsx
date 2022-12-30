import { IconStyled } from "./Icon.styled";
import { IconProps } from "./types";

export const AboutIcon = ({ color = "white" }: IconProps) => {
  return (
    <IconStyled>
      <path
        d="M13.08 20.49C11.6861 20.4801 10.3147 20.1372 9.08001 19.49C8.90826 19.3965 8.77917 19.2404 8.71957 19.0541C8.65997 18.8679 8.67445 18.6658 8.76001 18.49C8.85166 18.3164 9.00771 18.1857 9.19467 18.1258C9.38164 18.066 9.58461 18.0819 9.76001 18.17C11.2009 18.9109 12.8466 19.1535 14.44 18.86C15.7143 18.6085 16.8977 18.0193 17.8663 17.154C18.835 16.2887 19.5534 15.179 19.9464 13.941C20.3395 12.703 20.3927 11.3822 20.1006 10.1166C19.8084 8.85094 19.1817 7.68706 18.2858 6.74659C17.3899 5.80612 16.2578 5.1236 15.0078 4.77039C13.7579 4.41718 12.436 4.40625 11.1804 4.73875C9.92481 5.07125 8.78159 5.73496 7.87028 6.6605C6.95896 7.58603 6.31303 8.7394 6.00001 10C5.54983 11.8706 5.85524 13.8432 6.85001 15.49C6.94403 15.6571 6.97052 15.8538 6.92402 16.0398C6.87753 16.2257 6.76159 16.3868 6.60001 16.49C6.43295 16.584 6.23623 16.6105 6.05026 16.564C5.86428 16.5175 5.70317 16.4016 5.60001 16.24C4.86968 15.0324 4.44298 13.6658 4.35648 12.2573C4.26997 10.8487 4.52623 9.44013 5.1033 8.15228C5.68038 6.86443 6.56106 5.73568 7.6699 4.86273C8.77874 3.98978 10.0827 3.39865 11.47 3.14C13.7522 2.71433 16.11 3.21269 18.0248 4.52544C19.9395 5.83819 21.2543 7.85781 21.68 10.14C22.1057 12.4222 21.6073 14.78 20.2946 16.6947C18.9818 18.6095 16.9622 19.9243 14.68 20.35C14.1515 20.4412 13.6163 20.4881 13.08 20.49Z"
        fill={color}
      />
      <path
        d="M5.33001 21C5.09027 21.0057 4.85298 20.9507 4.64026 20.8399C4.42755 20.7292 4.24635 20.5664 4.11356 20.3667C3.98076 20.167 3.90071 19.937 3.88085 19.698C3.861 19.459 3.90199 19.2189 4.00001 19L5.53001 15.58C5.57004 15.4888 5.62782 15.4065 5.69999 15.3379C5.77215 15.2693 5.85726 15.2157 5.95035 15.1804C6.04343 15.145 6.14263 15.1285 6.24216 15.1319C6.34168 15.1353 6.43953 15.1584 6.53001 15.2C6.71236 15.283 6.85459 15.4346 6.92575 15.6218C6.99691 15.8091 6.99126 16.0169 6.91001 16.2L5.48001 19.45L9.15001 18.14C9.24441 18.0986 9.34633 18.077 9.44942 18.0768C9.5525 18.0765 9.65454 18.0975 9.74916 18.1384C9.84377 18.1793 9.92894 18.2393 9.99933 18.3146C10.0697 18.3899 10.1238 18.4789 10.1583 18.5761C10.1927 18.6733 10.2068 18.7765 10.1996 18.8793C10.1924 18.9822 10.164 19.0824 10.1163 19.1738C10.0686 19.2652 10.0026 19.3457 9.92236 19.4105C9.84213 19.4752 9.74942 19.5227 9.65001 19.55L5.80001 20.92C5.64956 20.9752 5.49025 21.0023 5.33001 21Z"
        fill={color}
      />
    </IconStyled>
  );
};
