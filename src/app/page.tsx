import Image from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ConsumptionMethodOption from "./[slug]/components/consumption-method-option";

const RestaurantPage = async () => {
    const slug = 'nx-donalds';
    const restaurant = await db.restaurant.findUnique({
        where: { slug: slug },
    });

    if (!restaurant) {
        return notFound();
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center px-6">
            {/* Logo e titulo */}
            <div className="flex flex-col items-center gap-2">
                <Image
                    src={restaurant.avatarImageUrl}
                    alt={restaurant.name}
                    width={82}
                    height={82}
                />
                <h2 className="font-semibold"> {restaurant.name}</h2>
            </div>
            {/* BEM-VINDO */}
            <div className="space-y-2 pt-24 text-center">
                <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
                <p className="opacity-55">
                    Escolha como prefere aproveitar sua refeição. Estamos aqui
                    para oferecer praticidade e sabor em cada detalhe!
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-14">
                <ConsumptionMethodOption
                    option="DINE_IN"
                    slug={slug}
                    buttonText="Para comer aqui"
                    imageAlt="Comer aqui"
                    imageUrl="/dine_in.png"
                />
                <ConsumptionMethodOption
                    option="TAKEAWAY"
                    slug={slug}
                    buttonText="Para levar"
                    imageAlt="Para levar"
                    imageUrl="/takeaway.png"
                />
            </div>
            <footer className=" fixed bottom-3 mt-10 text-gray-600 text-sm">
                © {new Date().getFullYear()} Powered by NAXX
            </footer>
        </div>
    );
};

export default RestaurantPage;
