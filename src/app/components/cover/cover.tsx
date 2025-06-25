import Image from "next/image";

export default function Cover ({data}: { data?: string}) {
    if( data ){
        return (
            <Image
                src={ data }
                alt="Album Cover"
                width={250}
                height={250}
            />
        );
    }
}