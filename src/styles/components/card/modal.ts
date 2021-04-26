import styled from 'styled-components'

export const Container = styled.div`
    min-width: 400px;
    max-height: 100vh;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    border: 2px solid black;
    border-radius: 10px;
    overflow: auto;

    button {
        font-size: 1.2rem;
        padding: 10px 20px;
        outline: none;
        border: none;
        cursor: pointer;
        border-radius: 10px;
        border: 1px solid #000;
        transition: 0.25s;
    }

    header {
        width: 100%;
        padding: 15px;
        text-align: center;
        background: ${props => props.theme.colors.secondary};
        border-radius: 10px 10px 0 0;
    }

    main {
        padding: 15px;
        margin-top: 0;

        div:nth-child(1) {
            padding: 0 15px;
        }

        .buttons {
            display: flex;
            justify-content: space-around;

            #delete {
                background: #d00000;

                &:hover {
                    background: #9d0208;
                }
            }

            #edit {
                background: #4361ee;

                &:hover {
                    background: #3f37c9;
                }
            }

            #submit {
                background: #38b000;

                &:hover {
                    background: #008000;
                }
            }
        }
    }

    footer {
        padding: 15px;

        div {
            display: flex;
            justify-content: space-around;

            #close {
                background: #adb5bd;

                &:hover {
                    background: red;
                }
            }
        }
    }
`
