interface Props {
  params: {
    token: string;
  };
}

export async function GET(request: Request, { params }: Props) {
  console.log(params);
}
