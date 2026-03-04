export interface FAQ {
    id: string;
    question: string;
    answer: string;
}

export const FAQ_MOCK_DATA: FAQ[] = [
    {
        id: '1',
        question: '1- Kan şekerinizi evde ölçebileceğinizi biliyor musunuz?',
        answer: 'Kan şekerinizi glukometre ile ev ortamında ölçebilirsiniz. Yaklaşık 5 saniye içerisinde dijital alanda sonuç görünmektedir. Kan şekeri ölçerken ilk gelen kanı pamukla silmeli devamında gelen kanı ölçüm için kullanmalısınız.'
    },
    {
        id: '2',
        question: '2- Prediyabet (gizli şeker) tehlikeli bir hastalık mıdır?',
        answer: 'Kontrol altına alındıktan sonra prediyabet tehlikeli bir hastalık değildir. Hastalığı kontrol altında tutmanın bir diğer avantajı diyabete geçiş sürecinin önlenerek hastalık riskinin düşürülmesidir. Yaşam tarzı değişiklikleri prediyabet riskinin düşürülmesinde önemlidir. Dünya Sağlık Örgütü erişkinler için günde en az 30 dakika, haftanın en az beş günü olmak kaydıyla haftada minimum 150 dakika fiziksel aktivite yapılmasını önermektedir. Akdeniz diyetine bağlı bir beslenme sürdürülmesi yine düşük hastalık riski ile ilişkilendirilmiştir. Bu önerilere uyum sağlandığı taktirde prediyabet korkulacak bir hastalık olmayacaktır.'
    },
    {
        id: '3',
        question: '3- Prediyabeti (gizli şeker) nasıl kontrol altına alabilirim?',
        answer: 'Hastalığı kontrol altında tutmak için sağlıklı beslenme alışkanlıkları edinmeli, düzenli fiziksel aktivite yapmalı ve ideal vücut ağırlığınızı korumalısınız. Doktorunuzun önereceği yaşam tarzı değişikliklerine uyum sağlamak kan şekeri seviyenizi normal aralıklarda tutmanıza yardımcı olacaktır.'
    },
    {
        id: '4',
        question: '4- Prediyabet belirtileri nelerdir?',
        answer: 'Prediyabet genellikle belirgin semptomlar göstermez, bu nedenle "gizli şeker" olarak adlandırılır. Ancak bazı kişilerde diyabette görülen sık idrara çıkma, aşırı susama, açıklanamayan yorgunluk veya bulanık görme gibi hafif belirtiler ortaya çıkabilir. Kesin teşhis sadece kan testleri ile konulabilir.'
    },
    {
        id: '6',
        question: '6- How do I track my activity in the app?',
        answer: 'You can go to the "Activity" tab on the bottom menu or select the "Log Activity" button on your Home Screen. You can manually enter your daily steps and active minutes to keep a record of your fitness journey.'
    },
    {
        id: '7',
        question: '7- Is the Risk Test score permanent?',
        answer: 'No! Your risk score is dynamic. As you update your profile, log better activities, and re-take the risk test through the Home Screen, your score and status will update to reflect your newly healthier lifestyle.'
    },
    {
        id: '8',
        question: '8- How is my BMI calculated?',
        answer: 'BMI (Body Mass Index) is calculated by dividing your weight in kilograms by the square of your height in meters. You can update your measurements at any time through the BMI Tracker page to see your current trend.'
    }
];
