-- DropForeignKey
ALTER TABLE "Correction" DROP CONSTRAINT "Correction_essay_id_fkey";

-- DropForeignKey
ALTER TABLE "CorrectionReply" DROP CONSTRAINT "CorrectionReply_correction_id_fkey";

-- DropForeignKey
ALTER TABLE "CorrectionSentence" DROP CONSTRAINT "CorrectionSentence_id_correction_fkey";

-- DropForeignKey
ALTER TABLE "Essay" DROP CONSTRAINT "Essay_id_space_fkey";

-- DropForeignKey
ALTER TABLE "EssayHashtag" DROP CONSTRAINT "EssayHashtag_essay_id_fkey";

-- DropForeignKey
ALTER TABLE "FlashCard" DROP CONSTRAINT "FlashCard_id_vocabulary_fkey";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_id_follower_fkey";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_id_following_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_id_space_fkey";

-- DropForeignKey
ALTER TABLE "QuizQuestion" DROP CONSTRAINT "QuizQuestion_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "UserLanguage" DROP CONSTRAINT "UserLanguage_user_id_fkey";

-- AddForeignKey
ALTER TABLE "UserLanguage" ADD CONSTRAINT "UserLanguage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_id_follower_fkey" FOREIGN KEY ("id_follower") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_id_following_fkey" FOREIGN KEY ("id_following") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Essay" ADD CONSTRAINT "Essay_id_space_fkey" FOREIGN KEY ("id_space") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EssayHashtag" ADD CONSTRAINT "EssayHashtag_essay_id_fkey" FOREIGN KEY ("essay_id") REFERENCES "Essay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correction" ADD CONSTRAINT "Correction_essay_id_fkey" FOREIGN KEY ("essay_id") REFERENCES "Essay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorrectionSentence" ADD CONSTRAINT "CorrectionSentence_id_correction_fkey" FOREIGN KEY ("id_correction") REFERENCES "Correction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorrectionReply" ADD CONSTRAINT "CorrectionReply_correction_id_fkey" FOREIGN KEY ("correction_id") REFERENCES "Correction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_id_space_fkey" FOREIGN KEY ("id_space") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizQuestion" ADD CONSTRAINT "QuizQuestion_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashCard" ADD CONSTRAINT "FlashCard_id_vocabulary_fkey" FOREIGN KEY ("id_vocabulary") REFERENCES "Vocabulary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
